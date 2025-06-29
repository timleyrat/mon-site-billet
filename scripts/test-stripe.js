require('dotenv').config({ path: '.env.local' });

console.log('🧪 Test de la configuration Stripe...\n');

// Vérifier les variables d'environnement
const requiredVars = {
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
};

console.log('📋 Variables d\'environnement :');
Object.entries(requiredVars).forEach(([key, value]) => {
  if (value) {
    const maskedValue = value.substring(0, 10) + '...' + value.substring(value.length - 4);
    console.log(`✅ ${key}: ${maskedValue}`);
  } else {
    console.log(`❌ ${key}: MANQUANTE`);
  }
});

console.log('');

// Vérifier le format des clés
if (process.env.STRIPE_SECRET_KEY) {
  if (process.env.STRIPE_SECRET_KEY.startsWith('sk_test_')) {
    console.log('✅ STRIPE_SECRET_KEY: Format test valide');
  } else if (process.env.STRIPE_SECRET_KEY.startsWith('sk_live_')) {
    console.log('⚠️  STRIPE_SECRET_KEY: Format production détecté');
  } else {
    console.log('❌ STRIPE_SECRET_KEY: Format invalide');
  }
}

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.startsWith('pk_test_')) {
    console.log('✅ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: Format test valide');
  } else if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.startsWith('pk_live_')) {
    console.log('⚠️  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: Format production détecté');
  } else {
    console.log('❌ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: Format invalide');
  }
}

console.log('');

// Tester l'initialisation de Stripe
try {
  const Stripe = require('stripe');
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-05-28.basil',
  });
  
  console.log('✅ Stripe initialisé avec succès');
  
  // Tester une requête simple
  stripe.paymentMethods.list({ limit: 1 })
    .then(() => {
      console.log('✅ Connexion à Stripe réussie');
      console.log('');
      console.log('🎉 Configuration Stripe OK !');
      console.log('Vous pouvez maintenant tester les paiements.');
    })
    .catch((error) => {
      console.log('❌ Erreur de connexion à Stripe:', error.message);
      console.log('');
      console.log('🔧 Solutions possibles :');
      console.log('1. Vérifiez que vos clés Stripe sont correctes');
      console.log('2. Assurez-vous d\'être connecté à internet');
      console.log('3. Vérifiez que votre compte Stripe est actif');
    });
    
} catch (error) {
  console.log('❌ Erreur lors de l\'initialisation de Stripe:', error.message);
}

console.log(''); 