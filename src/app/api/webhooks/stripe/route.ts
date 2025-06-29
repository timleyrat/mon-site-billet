import { NextRequest, NextResponse } from 'next/server';
import { getStripeServer } from '@/lib/stripe';
import { headers } from 'next/headers';
import { createTransaction } from '@/lib/stripe-connect';
import { createTicket } from '@/lib/ticket-generator';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Signature Stripe manquante' },
      { status: 400 }
    );
  }

  let event;

  try {
    const stripe = getStripeServer();
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
      console.warn('STRIPE_WEBHOOK_SECRET non définie, webhook non vérifié');
      // En mode test, on peut continuer sans webhook secret
      event = JSON.parse(body);
    } else {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    }
  } catch (err) {
    console.error('Erreur de signature webhook:', err);
    return NextResponse.json(
      { error: 'Signature webhook invalide' },
      { status: 400 }
    );
  }

  // Gérer les événements de paiement
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      
      // Traiter le paiement réussi
      await handleSuccessfulPayment(session);
      break;

    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('Paiement réussi:', paymentIntent.id);
      break;

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      console.log('Paiement échoué:', failedPayment.id);
      break;

    default:
      console.log(`Événement non géré: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

async function handleSuccessfulPayment(session: {
  id: string;
  customer?: string;
  customer_details?: {
    email?: string;
    name?: string;
  };
  amount_total: number;
  metadata: {
    ticketId: string;
    sellerId: string;
    quantity: string;
    commission: string;
    sellerAmount: string;
    originalPrice: string;
    totalAmount: string;
    eventTitle?: string;
    eventDate?: string;
    eventLocation?: string;
  };
}) {
  try {
    const {
      ticketId,
      sellerId,
      quantity,
      commission,
      sellerAmount,
      originalPrice,
      totalAmount,
      eventTitle,
      eventDate,
      eventLocation
    } = session.metadata;

    // Créer une transaction en attente
    const transaction = createTransaction({
      sessionId: session.id,
      ticketId,
      sellerId,
      buyerId: session.customer,
      amount: session.amount_total,
      commission: parseInt(commission),
      sellerAmount: parseInt(sellerAmount),
      originalPrice: parseInt(originalPrice),
      status: 'completed', // Paiement reçu, en attente de transfert manuel
    });

    console.log('Transaction créée:', {
      transactionId: transaction.id,
      sessionId: session.id,
      ticketId,
      sellerId,
      commission: `${commission} centimes (10%)`,
      sellerAmount: `${sellerAmount} centimes (90%)`,
      originalPrice: `${originalPrice} centimes`,
      totalAmount: `${totalAmount} centimes`,
      amountPaid: session.amount_total,
      status: 'completed - Transfert manuel requis',
    });

    // Générer automatiquement le billet électronique
    try {
      const ticketData = {
        ticketId,
        eventTitle: eventTitle || 'Événement',
        eventDate: eventDate || new Date().toISOString(),
        eventLocation: eventLocation || 'Lieu à préciser',
        quantity: quantity || 1,
      };

      const generatedTicket = await createTicket(session, ticketData);
      
      console.log('Billet généré automatiquement:', {
        ticketId: generatedTicket.id,
        ticketNumber: generatedTicket.ticketNumber,
        sessionId: session.id,
        eventTitle: generatedTicket.eventTitle,
        buyerEmail: generatedTicket.buyerEmail,
        pdfUrl: generatedTicket.pdfUrl ? 'Généré' : 'Erreur',
      });

    } catch (ticketError) {
      console.error('Erreur lors de la génération du billet:', ticketError);
    }

    // Ici, vous pouvez ajouter votre logique métier :
    // - Envoyer un email de confirmation à l'acheteur
    // - Notifier l'administrateur qu'un transfert manuel est requis
    // - Mettre à jour la quantité disponible du billet

    // Exemple : Mettre à jour la quantité disponible
    // await updateTicketQuantity(ticketId, parseInt(quantity));
    
    // Exemple : Envoyer un email de confirmation
    // await sendConfirmationEmail(session.customer, transaction);

  } catch (error) {
    console.error('Erreur lors du traitement du paiement:', error);
  }
} 