import Stripe from 'stripe';
import { getStripeServer } from './stripe';

// Validation de la configuration Stripe
const validateStripeConfig = () => {
  const requiredEnvVars = [
    'STRIPE_SECRET_KEY',
    'STRIPE_PUBLISHABLE_KEY',
    'NEXT_PUBLIC_BASE_URL'
  ];

  const missingVars = requiredEnvVars
    .map(varName => [varName, process.env[varName]])
    .filter(([_, value]) => !value);

  if (missingVars.length > 0) {
    throw new Error(`Variables d'environnement manquantes: ${missingVars.map(([name]) => name).join(', ')}`);
  }
};

// Configuration Stripe côté serveur
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
  typescript: true,
});

// Types pour les comptes vendeurs
export interface SellerAccount {
  id: string;
  email: string;
  name: string;
  stripeAccountId?: string; // ID du compte Stripe Connect
  isVerified: boolean;
  balance: number; // Solde en centimes
}

// Base de données en mémoire pour les comptes vendeurs (vide pour la production)
export const sellerAccounts: Map<string, SellerAccount> = new Map();

// Types pour les transactions
export interface Transaction {
  id: string;
  sessionId: string;
  ticketId: string;
  sellerId: string;
  buyerId?: string;
  amount: number; // Montant total payé
  commission: number; // Commission de la plateforme
  sellerAmount: number; // Montant pour le vendeur
  originalPrice: number; // Prix original du billet
  status: 'pending' | 'completed' | 'transferred' | 'cancelled';
  createdAt: Date;
  transferredAt?: Date;
}

// Base de données en mémoire pour les transactions (vide pour la production)
export const transactions: Map<string, Transaction> = new Map();

// Commission de 10%
export const COMMISSION_PERCENTAGE = 0.10;

// Calcul du montant de la commission
export const calculateCommission = (ticketPrice: number): number => {
  return Math.round(ticketPrice * COMMISSION_PERCENTAGE);
};

// Calcul du montant pour le vendeur (90%)
export const calculateSellerAmount = (ticketPrice: number): number => {
  return ticketPrice - calculateCommission(ticketPrice);
};

// Création d'un compte Stripe Connect Express pour un vendeur
export const createSellerConnectAccount = async (sellerId: string): Promise<string> => {
  try {
    const stripe = getStripeServer();
    
    const seller = sellerAccounts.get(sellerId);
    if (!seller) {
      throw new Error('Vendeur non trouvé');
    }

    // En production, vous créeriez un vrai compte Stripe Connect
    const account = await stripe.accounts.create({
      type: 'express',
      country: 'FR',
      email: seller.email,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      business_type: 'individual',
    });

    // Mettre à jour le vendeur avec l'ID du compte Stripe
    seller.stripeAccountId = account.id;
    sellerAccounts.set(sellerId, seller);

    return account.id;
  } catch (error) {
    console.error('Erreur lors de la création du compte Connect:', error);
    throw new Error('Impossible de créer le compte vendeur');
  }
};

// Création d'une session de paiement avec Stripe Connect
export const createConnectCheckoutSession = async (
  ticket: any,
  quantity: number = 1
) => {
  try {
    const stripe = getStripeServer();
    
    const seller = sellerAccounts.get(ticket.sellerId);
    if (!seller) {
      throw new Error('Vendeur non trouvé');
    }

    // S'assurer que le vendeur a un compte Stripe Connect
    if (!seller.stripeAccountId) {
      await createSellerConnectAccount(ticket.sellerId);
    }

    // Vérifier à nouveau après création
    const updatedSeller = sellerAccounts.get(ticket.sellerId);
    if (!updatedSeller?.stripeAccountId) {
      throw new Error('Impossible de créer le compte Stripe pour le vendeur');
    }

    const commissionAmount = calculateCommission(ticket.price);
    const sellerAmount = calculateSellerAmount(ticket.price);
    const totalAmount = ticket.price + commissionAmount;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: ticket.title,
              description: `${ticket.description} - ${ticket.location} - ${new Date(ticket.eventDate).toLocaleDateString('fr-FR')}`,
              images: ticket.image ? [ticket.image] : undefined,
            },
            unit_amount: totalAmount,
          },
          quantity,
        },
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Commission BilletLibre (10%)',
              description: 'Frais de service de la plateforme',
            },
            unit_amount: commissionAmount,
          },
          quantity,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/tickets`,
      metadata: {
        ticketId: ticket.id,
        sellerId: ticket.sellerId,
        quantity: quantity.toString(),
        commission: commissionAmount.toString(),
        sellerAmount: sellerAmount.toString(),
        originalPrice: ticket.price.toString(),
        totalAmount: totalAmount.toString(),
      },
      // L'argent reste sur le compte de la plateforme (pas de transfert automatique)
      payment_intent_data: {
        application_fee_amount: commissionAmount * quantity,
        transfer_data: {
          destination: updatedSeller.stripeAccountId,
        },
      },
    });

    return session;
  } catch (error) {
    console.error('Erreur lors de la création de la session Connect:', error);
    throw new Error('Impossible de créer la session de paiement');
  }
};

// Fonction pour transférer manuellement l'argent au vendeur
export const transferToSeller = async (
  sellerId: string,
  amount: number,
  sessionId: string
): Promise<boolean> => {
  try {
    const stripe = getStripeServer();
    
    const seller = sellerAccounts.get(sellerId);
    if (!seller || !seller.stripeAccountId) {
      throw new Error('Vendeur ou compte Stripe non trouvé');
    }

    // En production, vous feriez un vrai transfert Stripe
    const transfer = await stripe.transfers.create({
      amount: amount,
      currency: 'eur',
      destination: seller.stripeAccountId,
      metadata: {
        sessionId: sessionId,
        sellerId: sellerId,
      },
    });

    // Mettre à jour le solde du vendeur
    seller.balance += amount;
    sellerAccounts.set(sellerId, seller);

    // Mettre à jour le statut de la transaction
    const transaction = getTransactionBySessionId(sessionId);
    if (transaction) {
      transaction.status = 'transferred';
      transaction.transferredAt = new Date();
      transactions.set(transaction.id, transaction);
    }

    return true;
  } catch (error) {
    console.error('Erreur lors du transfert:', error);
    return false;
  }
};

// Fonction pour récupérer le solde d'un vendeur
export const getSellerBalance = (sellerId: string): number => {
  const seller = sellerAccounts.get(sellerId);
  return seller ? seller.balance : 0;
};

// Fonction pour récupérer toutes les transactions en attente
export const getPendingTransactions = (): Transaction[] => {
  return Array.from(transactions.values()).filter(t => t.status === 'completed');
};

// Fonction pour créer une nouvelle transaction
export const createTransaction = (data: Omit<Transaction, 'id' | 'createdAt'>): Transaction => {
  const transaction: Transaction = {
    ...data,
    id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date(),
  };
  
  transactions.set(transaction.id, transaction);
  return transaction;
};

// Fonction pour récupérer une transaction par session ID
export const getTransactionBySessionId = (sessionId: string): Transaction | undefined => {
  return Array.from(transactions.values()).find(t => t.sessionId === sessionId);
}; 