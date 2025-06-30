import { NextRequest, NextResponse } from 'next/server';

// Mode démo - simulation des fonctions Stripe
const DEMO_MODE = !process.env.STRIPE_SECRET_KEY;

// Simulation des données de transaction en mode démo
const demoTransactions = new Map();

// Fonction de simulation pour le transfert
const simulateTransferToSeller = async (sellerId: string, amount: number, sessionId: string): Promise<boolean> => {
  // En mode démo, on simule toujours un succès
  console.log(`[DEMO] Transfert simulé: ${amount / 100}€ vers le vendeur ${sellerId} pour la session ${sessionId}`);
  
  // Mettre à jour le statut de la transaction
  const transaction = demoTransactions.get(sessionId);
  if (transaction) {
    transaction.status = 'transferred';
    transaction.transferredAt = new Date();
    demoTransactions.set(sessionId, transaction);
  }
  
  return true;
};

// Fonction de simulation pour récupérer une transaction
const getDemoTransactionBySessionId = (sessionId: string) => {
  return demoTransactions.get(sessionId) || {
    id: `demo-${sessionId}`,
    sessionId,
    status: 'pending',
    amount: 5000, // 50€ en centimes
    sellerId: 'demo-seller',
    createdAt: new Date()
  };
};

// Fonction de simulation pour récupérer les transactions en attente
const getDemoPendingTransactions = () => {
  return Array.from(demoTransactions.values()).filter(t => t.status === 'pending');
};

export async function POST(request: NextRequest) {
  try {
    // Si on est en mode démo ou sans clé Stripe, on ne fait rien de critique
    if (DEMO_MODE) {
      const { sellerId, amount, sessionId } = await request.json();
      const success = await simulateTransferToSeller(sellerId, amount, sessionId);
      return NextResponse.json({
        success,
        message: `[DEMO] Transfert de ${amount / 100}€ effectué avec succès`,
        demo: true
      });
    }

    // Import dynamique uniquement si Stripe est configuré
    let transferToSeller, getTransactionBySessionId;
    try {
      const stripeConnect = await import('@/lib/stripe-connect');
      transferToSeller = stripeConnect.transferToSeller;
      getTransactionBySessionId = stripeConnect.getTransactionBySessionId;
    } catch (err) {
      // Si l'import échoue, on retourne une erreur contrôlée
      return NextResponse.json({
        error: 'Stripe non configuré ou indisponible',
        demo: true
      }, { status: 501 });
    }

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
    // Ne jamais bloquer le build, même en cas d'erreur inattendue
    console.error('Erreur lors du POST /api/transfer-to-seller:', error);
    return NextResponse.json(
      { error: 'Erreur serveur (API désactivée en mode démo ou Stripe absent)', demo: true },
      { status: 200 }
    );
  }
}

export async function GET() {
  try {
    if (DEMO_MODE) {
      const pendingTransactions = getDemoPendingTransactions();
      return NextResponse.json({
        transactions: pendingTransactions.map(t => ({
          id: t.id,
          sessionId: t.sessionId,
          ticketId: t.ticketId || 'demo-ticket',
          sellerId: t.sellerId,
          amount: t.amount,
          commission: t.commission || 500, // 5€ de commission
          sellerAmount: t.sellerAmount || 4500, // 45€ pour le vendeur
          originalPrice: t.originalPrice || 5000,
          createdAt: t.createdAt,
          status: t.status
        })),
        demo: true
      });
    }
    // Import dynamique uniquement si Stripe est configuré
    let getPendingTransactions;
    try {
      const stripeConnect = await import('@/lib/stripe-connect');
      getPendingTransactions = stripeConnect.getPendingTransactions;
    } catch (err) {
      return NextResponse.json({
        transactions: [],
        demo: true,
        error: 'Stripe non configuré ou indisponible'
      });
    }
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
    // Ne jamais bloquer le build, même en cas d'erreur inattendue
    console.error('Erreur lors du GET /api/transfer-to-seller:', error);
    return NextResponse.json({
      transactions: [],
      demo: true,
      error: 'Erreur serveur (API désactivée en mode démo ou Stripe absent)'
    });
  }
} 