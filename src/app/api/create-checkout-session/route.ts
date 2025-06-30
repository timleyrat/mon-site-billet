import { NextRequest, NextResponse } from 'next/server';
import { Ticket } from '@/lib/stripe';

// Mode démo - simulation des fonctions Stripe
const DEMO_MODE = !process.env.STRIPE_SECRET_KEY;

// Fonction de simulation pour créer une session de checkout
const createDemoCheckoutSession = async (ticket: Ticket, quantity: number) => {
  // En mode démo, on simule une session Stripe
  const sessionId = `demo_session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  console.log(`[DEMO] Session de checkout créée: ${sessionId} pour ${quantity} billet(s) à ${ticket.price / 100}€`);
  
  return {
    id: sessionId,
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/success?session_id=${sessionId}`,
    demo: true
  };
};

export async function POST(request: NextRequest) {
  try {
    const { ticket, quantity } = await request.json();

    if (!ticket || !quantity) {
      return NextResponse.json(
        { error: 'Ticket et quantité requis' },
        { status: 400 }
      );
    }

    // Validation du ticket
    const ticketData: Ticket = {
      id: ticket.id,
      title: ticket.title,
      description: ticket.description,
      price: ticket.price,
      sellerId: ticket.sellerId,
      eventDate: ticket.eventDate,
      location: ticket.location,
      quantity: ticket.quantity,
      image: ticket.image,
    };

    // Vérifier que la quantité demandée est disponible
    if (quantity > ticketData.quantity) {
      return NextResponse.json(
        { error: 'Quantité demandée non disponible' },
        { status: 400 }
      );
    }

    if (DEMO_MODE) {
      // Mode démo - créer une session simulée
      const session = await createDemoCheckoutSession(ticketData, quantity);
      
      return NextResponse.json({ 
        sessionId: session.id,
        demo: true,
        message: 'Session de démonstration créée avec succès'
      });
    } else {
      // Mode production - utiliser Stripe
      const { createCheckoutSession } = await import('@/lib/stripe');
      
      // Ajouter les métadonnées nécessaires pour la génération du billet
      const sessionData = {
        ...ticketData,
        quantity,
        // Métadonnées pour le billet
        eventTitle: ticketData.title,
        eventDate: ticketData.eventDate,
        eventLocation: ticketData.location,
      };

      const session = await createCheckoutSession(sessionData, quantity);

      return NextResponse.json({ sessionId: session.id });
    }
  } catch (error) {
    console.error('Erreur lors de la création de la session:', error);
    
    // Retourner une erreur plus détaillée
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json(
      { error: `Erreur lors de la création de la session de paiement: ${errorMessage}` },
      { status: 500 }
    );
  }
} 