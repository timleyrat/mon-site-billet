import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/stripe';
import { Ticket } from '@/lib/stripe';

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