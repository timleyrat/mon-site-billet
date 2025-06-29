'use client';

import { useState, useEffect } from 'react';
import type { Stripe } from '@stripe/stripe-js';
import { getStripe } from '@/lib/stripe';

interface UseStripeReturn {
  stripe: Stripe | null;
  loading: boolean;
  error: string | null;
}

export function useStripe(): UseStripeReturn {
  const [stripe, setStripe] = useState<Stripe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeStripe = async () => {
      try {
        setLoading(true);
        setError(null);

        const stripeInstance = await getStripe();
        
        if (!stripeInstance) {
          throw new Error('Impossible de charger Stripe');
        }

        setStripe(stripeInstance);
      } catch (err) {
        console.error('Erreur lors de l\'initialisation de Stripe:', err);
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    initializeStripe();
  }, []);

  return { stripe, loading, error };
}

// Hook pour rediriger vers Stripe Checkout
export function useStripeCheckout() {
  const { stripe, loading, error } = useStripe();
  const [redirecting, setRedirecting] = useState(false);

  const redirectToCheckout = async (sessionId: string) => {
    if (!stripe) {
      throw new Error('Stripe non initialisé');
    }

    setRedirecting(true);

    try {
      const { error: redirectError } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (redirectError) {
        throw redirectError;
      }
    } catch (err) {
      console.error('Erreur lors de la redirection vers Stripe:', err);
      throw err;
    } finally {
      setRedirecting(false);
    }
  };

  return {
    redirectToCheckout,
    redirecting,
    loading,
    error,
    stripe,
  };
} 