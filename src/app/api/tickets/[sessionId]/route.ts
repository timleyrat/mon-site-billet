import { NextRequest, NextResponse } from 'next/server';
import { getTicketBySessionId, markTicketAsDownloaded } from '@/lib/ticket-generator';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID requis' },
        { status: 400 }
      );
    }

    const ticket = getTicketBySessionId(sessionId);
    
    if (!ticket) {
      return NextResponse.json(
        { error: 'Billet non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json({ ticket });
  } catch (error) {
    console.error('Erreur lors de la récupération du billet:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID requis' },
        { status: 400 }
      );
    }

    const ticket = getTicketBySessionId(sessionId);
    
    if (!ticket) {
      return NextResponse.json(
        { error: 'Billet non trouvé' },
        { status: 404 }
      );
    }

    // Marquer le billet comme téléchargé
    markTicketAsDownloaded(ticket.id);

    return NextResponse.json({ 
      success: true, 
      message: 'Billet marqué comme téléchargé',
      ticket 
    });
  } catch (error) {
    console.error('Erreur lors du marquage du billet:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
} 