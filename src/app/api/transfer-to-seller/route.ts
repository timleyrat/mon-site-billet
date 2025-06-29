import { NextRequest, NextResponse } from 'next/server';
import { transferToSeller, getTransactionBySessionId, getPendingTransactions } from '@/lib/stripe-connect';

export async function POST(request: NextRequest) {
  try {
    const { sellerId, amount, sessionId } = await request.json();

    if (!sellerId || !amount || !sessionId) {
      return NextResponse.json(
        { error: 'sellerId, amount et sessionId requis' },
        { status: 400 }
      );
    }

    // Vérifier que la transaction existe et est en attente
    const transaction = getTransactionBySessionId(sessionId);
    if (!transaction) {
      return NextResponse.json(
        { error: 'Transaction non trouvée' },
        { status: 404 }
      );
    }

    if (transaction.status !== 'pending') {
      return NextResponse.json(
        { error: 'Transaction déjà traitée' },
        { status: 400 }
      );
    }

    // Effectuer le transfert
    const success = await transferToSeller(sellerId, amount, sessionId);

    if (success) {
      return NextResponse.json({ 
        success: true, 
        message: `Transfert de ${amount / 100}€ effectué avec succès` 
      });
    } else {
      return NextResponse.json(
        { error: 'Échec du transfert' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Erreur lors du transfert:', error);
    return NextResponse.json(
      { error: 'Erreur lors du transfert' },
      { status: 500 }
    );
  }
}

// GET pour obtenir les transactions en attente
export async function GET() {
  try {
    const pendingTransactions = getPendingTransactions();
    
    return NextResponse.json({
      transactions: pendingTransactions.map(t => ({
        id: t.id,
        sessionId: t.sessionId,
        ticketId: t.ticketId,
        sellerId: t.sellerId,
        amount: t.amount,
        commission: t.commission,
        sellerAmount: t.sellerAmount,
        originalPrice: t.originalPrice,
        createdAt: t.createdAt,
        status: t.status
      }))
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des transactions:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des transactions' },
      { status: 500 }
    );
  }
} 