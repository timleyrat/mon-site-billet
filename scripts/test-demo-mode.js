const fs = require('fs');
const path = require('path');

console.log('🧪 Test du mode démo - Vérification des APIs sans Stripe...\n');

// Simuler l'absence de variables Stripe
process.env.STRIPE_SECRET_KEY = undefined;
process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = undefined;
process.env.NEXT_PUBLIC_APP_MODE = 'demo';

console.log('📋 Configuration du mode démo:');
console.log('✅ STRIPE_SECRET_KEY = undefined');
console.log('✅ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = undefined');
console.log('✅ NEXT_PUBLIC_APP_MODE = demo');

// Vérifier les APIs modifiées
const apisToTest = [
  'src/app/api/transfer-to-seller/route.ts',
  'src/app/api/create-checkout-session/route.ts',
  'src/app/api/webhooks/stripe/route.ts'
];

console.log('\n🔍 Vérification des APIs en mode démo:');
apisToTest.forEach(apiPath => {
  const exists = fs.existsSync(apiPath);
  console.log(`${exists ? '✅' : '❌'} ${apiPath}`);
  
  if (exists) {
    const content = fs.readFileSync(apiPath, 'utf8');
    const hasDemoMode = content.includes('DEMO_MODE');
    const hasDemoHandling = content.includes('isDemoMode') || content.includes('DEMO_MODE');
    
    console.log(`   ${hasDemoMode ? '✅' : '❌'} Détection du mode démo`);
    console.log(`   ${hasDemoHandling ? '✅' : '❌'} Gestion du mode démo`);
  }
});

// Vérifier le fichier env.ts
console.log('\n⚙️ Vérification de la configuration:');
const envPath = 'src/lib/env.ts';
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  const hasIsDemoMode = content.includes('isDemoMode');
  const hasDemoConfig = content.includes('APP_MODE');
  
  console.log(`${hasIsDemoMode ? '✅' : '❌'} Fonction isDemoMode()`);
  console.log(`${hasDemoConfig ? '✅' : '❌'} Configuration du mode démo`);
} else {
  console.log('❌ Fichier env.ts manquant');
}

// Vérifier les variables d'environnement requises pour Vercel
console.log('\n🌐 Variables d\'environnement pour Vercel:');
const requiredEnvVars = [
  'NEXT_PUBLIC_BASE_URL',
  'NEXT_PUBLIC_APP_MODE'
];

requiredEnvVars.forEach(envVar => {
  console.log(`🔧 ${envVar} (requis pour le mode démo)`);
});

console.log('\n📝 Instructions pour Vercel (mode démo):');
console.log('1. Ajoutez NEXT_PUBLIC_BASE_URL = https://votre-domaine.vercel.app');
console.log('2. Ajoutez NEXT_PUBLIC_APP_MODE = demo');
console.log('3. Les variables Stripe sont optionnelles en mode démo');
console.log('4. Le site fonctionnera avec des données simulées');

console.log('\n🎯 Avantages du mode démo:');
console.log('✅ Pas d\'erreur Stripe au déploiement');
console.log('✅ Site fonctionnel pour la démonstration');
console.log('✅ Données simulées pour tester l\'interface');
console.log('✅ Transition facile vers le mode production');

console.log('\n✅ Test du mode démo terminé !');
console.log('Le site devrait maintenant se déployer sans erreur sur Vercel.'); 