// Configuration des variables d'environnement
export const env = {
  // Variables Stripe
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  
  // URL de base
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  
  // Mode de l'application
  NODE_ENV: process.env.NODE_ENV || 'development',
  APP_MODE: process.env.NEXT_PUBLIC_APP_MODE || 'demo',
  
  // Autres variables
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
};

// Détection du mode démo
export const isDemoMode = (): boolean => {
  return !env.STRIPE_SECRET_KEY || env.APP_MODE === 'demo';
};

// Validation de la configuration pour la production
export const validateProductionConfig = (): void => {
  if (isDemoMode()) {
    console.log('[DEMO] Mode démonstration activé - Stripe désactivé');
    return;
  }

  const requiredVars = [
    'STRIPE_SECRET_KEY',
    'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
    'NEXT_PUBLIC_BASE_URL'
  ];

  const missingVars = requiredVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(`Variables d'environnement manquantes pour la production: ${missingVars.join(', ')}`);
  }
};

// Configuration pour Vercel
export const getVercelConfig = () => {
  return {
    isDemoMode: isDemoMode(),
    hasStripe: !!env.STRIPE_SECRET_KEY,
    baseUrl: env.BASE_URL,
    nodeEnv: env.NODE_ENV,
    appMode: env.APP_MODE,
  };
};

// Configuration Stripe
export const stripeConfig = {
  publishableKey: env.STRIPE_PUBLISHABLE_KEY,
  secretKey: env.STRIPE_SECRET_KEY,
  webhookSecret: env.STRIPE_WEBHOOK_SECRET,
  baseUrl: env.BASE_URL,
} as const; 