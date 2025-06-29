import Stripe from 'stripe';
import type { Stripe as StripeClient } from '@stripe/stripe-js';

// Validation des variables d'environnement
const validateStripeConfig = () => {
  const requiredVars = {
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  };

  const missingVars = Object.entries(requiredVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    throw new Error(`Variables d'environnement manquantes: ${missingVars.join(', ')}`);
  }

  // Validation du format des clés Stripe
  if (!process.env.STRIPE_SECRET_KEY!.startsWith('sk_test_') && !process.env.STRIPE_SECRET_KEY!.startsWith('sk_live_')) {
    throw new Error('STRIPE_SECRET_KEY doit commencer par sk_test_ ou sk_live_');
  }

  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!.startsWith('pk_test_') && !process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!.startsWith('pk_live_')) {
    throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY doit commencer par pk_test_ ou pk_live_');
  }
};

// Configuration Stripe côté serveur
let stripeInstance: Stripe | null = null;

export const getStripeServer = (): Stripe => {
  if (!stripeInstance) {
    try {
      validateStripeConfig();
      stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: '2025-05-28.basil',
        typescript: true,
      });
    } catch (error) {
      console.error('Erreur lors de l\'initialisation de Stripe côté serveur:', error);
      throw error;
    }
  }
  return stripeInstance;
};

// Promesse unique pour Stripe côté client
let stripePromise: Promise<StripeClient | null> | null = null;

// Configuration Stripe côté client avec promesse unique
export const getStripe = (): Promise<StripeClient | null> => {
  if (typeof window === 'undefined') {
    return Promise.resolve(null);
  }

  if (!stripePromise) {
    stripePromise = import('@stripe/stripe-js')
      .then((stripe) => {
        const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
        if (!publishableKey) {
          throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY non définie');
        }
        return stripe.loadStripe(publishableKey);
      })
      .catch((error) => {
        console.error('Erreur lors du chargement de Stripe côté client:', error);
        return null;
      });
  }

  return stripePromise;
};

// Types pour les billets
export interface Ticket {
  id: string;
  title: string;
  description: string;
  price: number;
  sellerId: string;
  eventDate: string;
  location: string;
  quantity: number;
  image?: string;
}

// Commission dynamique de 10%
export const COMMISSION_PERCENTAGE = 0.10; // 10%

// Calcul du montant de la commission (prélevé sur le montant reçu par le vendeur)
export const calculateCommission = (ticketPrice: number): number => {
  return Math.round(ticketPrice * COMMISSION_PERCENTAGE);
};

// Calcul du montant pour le vendeur (90% du prix affiché)
export const calculateSellerAmount = (ticketPrice: number): number => {
  return ticketPrice - calculateCommission(ticketPrice);
};

// Le prix affiché est le prix final pour l'acheteur (aucune commission en plus)
export const getDisplayPrice = (ticketPrice: number): number => {
  return ticketPrice; // L'acheteur paie exactement le prix affiché
};

// Validation d'un ticket
export const validateTicket = (ticket: any): ticket is Ticket => {
  return (
    ticket &&
    typeof ticket.id === 'string' &&
    typeof ticket.title === 'string' &&
    typeof ticket.description === 'string' &&
    typeof ticket.price === 'number' &&
    typeof ticket.sellerId === 'string' &&
    typeof ticket.eventDate === 'string' &&
    typeof ticket.location === 'string' &&
    typeof ticket.quantity === 'number' &&
    ticket.price > 0 &&
    ticket.quantity >= 0
  );
};

// Création d'une session de paiement Stripe
export const createCheckoutSession = async (ticket: Ticket, quantity: number = 1) => {
  try {
    // Validation de la configuration
    validateStripeConfig();
    
    // Validation du ticket
    if (!validateTicket(ticket)) {
      throw new Error('Ticket invalide');
    }
    
    // Validation de la quantité
    if (quantity <= 0 || quantity > ticket.quantity) {
      throw new Error('Quantité invalide');
    }
    
    const stripe = getStripeServer();
    
    // L'acheteur paie exactement le prix affiché (aucune commission en plus)
    const displayPrice = getDisplayPrice(ticket.price);
    const commissionAmount = calculateCommission(ticket.price);
    const sellerAmount = calculateSellerAmount(ticket.price);
    
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
            unit_amount: displayPrice, // Prix exact affiché à l'acheteur
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
        displayPrice: displayPrice.toString(),
        eventTitle: ticket.title,
        eventDate: ticket.eventDate,
        eventLocation: ticket.location,
      },
    });

    return session;
  } catch (error) {
    console.error('Erreur lors de la création de la session Stripe:', error);
    throw new Error(`Impossible de créer la session de paiement: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
  }
};

// Récupération d'une session de paiement
export const retrieveCheckoutSession = async (sessionId: string) => {
  try {
    validateStripeConfig();
    const stripe = getStripeServer();
    return await stripe.checkout.sessions.retrieve(sessionId);
  } catch (error) {
    console.error('Erreur lors de la récupération de la session:', error);
    throw new Error('Impossible de récupérer la session de paiement');
  }
}; 