require('dotenv').config({ path: '.env.local' });

console.log('🧪 Test de la configuration Stripe côté serveur...\n');

// Vérifier les variables d'environnement
console.log('📋 Variables d\'environnement côté serveur :');
console.log(`STRIPE_SECRET_KEY: ${process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY.substring(0, 20) + '...' : 'MANQUANTE'}`);
console.log(`NEXT_PUBLIC_BASE_URL: ${process.env.NEXT_PUBLIC_BASE_URL || 'MANQUANTE'}`);
console.log('');

// Tester l'initialisation de Stripe côté serveur
try {
  const Stripe = require('stripe');
  
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY non définie');
  }

  console.log('✅ STRIPE_SECRET_KEY trouvée');
  
  if (!process.env.STRIPE_SECRET_KEY.startsWith('sk_test_') && !process.env.STRIPE_SECRET_KEY.startsWith('sk_live_')) {
    throw new Error('Format de STRIPE_SECRET_KEY invalide');
  }

  console.log('✅ Format de STRIPE_SECRET_KEY valide');

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-05-28.basil',
  });

  console.log('✅ Instance Stripe côté serveur créée');

  // Tester une requête simple
  console.log('🔄 Test de connexion à Stripe...');
  
  stripe.paymentMethods.list({ limit: 1 })
    .then(() => {
      console.log('✅ Connexion à Stripe réussie !');
      console.log('');
      console.log('🎉 Configuration Stripe côté serveur OK !');
      console.log('Vous pouvez maintenant créer des sessions de paiement.');
    })
    .catch((error) => {
      console.log('❌ Erreur de connexion à Stripe:', error.message);
      console.log('');
      console.log('🔧 Solutions possibles :');
      console.log('1. Vérifiez que votre clé Stripe est correcte');
      console.log('2. Assurez-vous que votre compte Stripe est actif');
      console.log('3. Vérifiez votre connexion internet');
      console.log('4. Vérifiez que vous utilisez la bonne clé (test vs live)');
    });

} catch (error) {
  console.log('❌ Erreur lors de l\'initialisation:', error.message);
  console.log('');
  console.log('🔧 Vérifiez votre fichier .env.local');
} 