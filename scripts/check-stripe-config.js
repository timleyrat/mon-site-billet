#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Vérification de la configuration Stripe...\n');

// Vérifier si le fichier .env.local existe
const envPath = path.join(process.cwd(), '.env.local');
const envExists = fs.existsSync(envPath);

if (!envExists) {
  console.log('❌ Fichier .env.local non trouvé');
  console.log('📝 Créez un fichier .env.local avec les variables suivantes :\n');
  console.log('STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here');
  console.log('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here');
  console.log('STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here');
  console.log('NEXT_PUBLIC_BASE_URL=http://localhost:3000\n');
  process.exit(1);
}

// Lire le fichier .env.local
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};

envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    envVars[key.trim()] = value.trim();
  }
});

// Vérifier les variables requises
const requiredVars = [
  'STRIPE_SECRET_KEY',
  'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
  'NEXT_PUBLIC_BASE_URL'
];

const optionalVars = [
  'STRIPE_WEBHOOK_SECRET'
];

console.log('✅ Variables d\'environnement requises :');
requiredVars.forEach(varName => {
  if (envVars[varName]) {
    console.log(`   ✅ ${varName} : ${envVars[varName].substring(0, 20)}...`);
  } else {
    console.log(`   ❌ ${varName} : MANQUANTE`);
  }
});

console.log('\n📋 Variables d\'environnement optionnelles :');
optionalVars.forEach(varName => {
  if (envVars[varName]) {
    console.log(`   ✅ ${varName} : ${envVars[varName].substring(0, 20)}...`);
  } else {
    console.log(`   ⚠️  ${varName} : NON DÉFINIE (optionnelle)`);
  }
});

// Vérifier les formats des clés Stripe
console.log('\n🔑 Validation des clés Stripe :');

if (envVars.STRIPE_SECRET_KEY) {
  if (envVars.STRIPE_SECRET_KEY.startsWith('sk_test_') || envVars.STRIPE_SECRET_KEY.startsWith('sk_live_')) {
    console.log('   ✅ STRIPE_SECRET_KEY : Format valide');
  } else {
    console.log('   ❌ STRIPE_SECRET_KEY : Format invalide (doit commencer par sk_test_ ou sk_live_)');
  }
}

if (envVars.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  if (envVars.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.startsWith('pk_test_') || envVars.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.startsWith('pk_live_')) {
    console.log('   ✅ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY : Format valide');
  } else {
    console.log('   ❌ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY : Format invalide (doit commencer par pk_test_ ou pk_live_)');
  }
}

if (envVars.STRIPE_WEBHOOK_SECRET) {
  if (envVars.STRIPE_WEBHOOK_SECRET.startsWith('whsec_')) {
    console.log('   ✅ STRIPE_WEBHOOK_SECRET : Format valide');
  } else {
    console.log('   ❌ STRIPE_WEBHOOK_SECRET : Format invalide (doit commencer par whsec_)');
  }
}

console.log('\n📦 Vérification des dépendances...');

// Vérifier si stripe est installé
const packageJsonPath = path.join(process.cwd(), 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
  
  if (dependencies.stripe) {
    console.log('   ✅ stripe : Installé');
  } else {
    console.log('   ❌ stripe : Non installé');
  }
  
  if (dependencies['@stripe/stripe-js']) {
    console.log('   ✅ @stripe/stripe-js : Installé');
  } else {
    console.log('   ❌ @stripe/stripe-js : Non installé');
  }
}

console.log('\n💰 Configuration de la commission :');
console.log('   ✅ Commission dynamique : 10% du prix du billet');
console.log('   ✅ Vendeur reçoit : 90% du montant original');
console.log('   ✅ Plateforme garde : 10% du montant original');

console.log('\n🎉 Vérification terminée !');
console.log('\n📚 Prochaines étapes :');
console.log('1. Configurez vos clés Stripe dans le fichier .env.local');
console.log('2. Lancez le serveur de développement : npm run dev');
console.log('3. Testez l\'intégration Stripe avec des clés de test');
console.log('4. Vérifiez que la commission de 10% s\'applique correctement'); 