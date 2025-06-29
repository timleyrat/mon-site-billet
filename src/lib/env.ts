// Validation des variables d'environnement
const requiredEnvVars = {
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
} as const;

// Variables optionnelles
const optionalEnvVars = {
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
} as const;

// Validation des variables requises
export function validateEnv() {
  const missingVars = Object.entries(requiredEnvVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    throw new Error(
      `Variables d'environnement manquantes: ${missingVars.join(', ')}`
    );
  }
}

// Export des variables d'environnement avec validation
export const env = {
  STRIPE_SECRET_KEY: requiredEnvVars.STRIPE_SECRET_KEY!,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: requiredEnvVars.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  NEXT_PUBLIC_BASE_URL: requiredEnvVars.NEXT_PUBLIC_BASE_URL!,
  STRIPE_WEBHOOK_SECRET: optionalEnvVars.STRIPE_WEBHOOK_SECRET,
} as const;

// Configuration Stripe
export const stripeConfig = {
  publishableKey: env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  secretKey: env.STRIPE_SECRET_KEY,
  webhookSecret: env.STRIPE_WEBHOOK_SECRET,
  baseUrl: env.NEXT_PUBLIC_BASE_URL,
} as const; 