import { NextRequest, NextResponse } from 'next/server';

// Simulation d'une base de données d'événements
let events: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validation des données requises
    const requiredFields = ['title', 'category', 'date', 'time', 'location', 'price', 'quantity'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Le champ ${field} est requis` },
          { status: 400 }
        );
      }
    }

    // Créer l'événement
    const event = {
      id: 'evt_' + Date.now(),
      ...body,
      status: 'En attente de validation',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Ajouter à la "base de données"
    events.push(event);

    return NextResponse.json({
      success: true,
      event: event,
      message: 'Événement créé avec succès'
    });

  } catch (error) {
    console.error('Erreur lors de la création de l\'événement:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de l\'événement' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Retourner tous les événements (pour l'administration)
    return NextResponse.json({
      events: events,
      total: events.length
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des événements:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des événements' },
      { status: 500 }
    );
  }
} 