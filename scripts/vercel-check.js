const fs = require('fs');
const path = require('path');

console.log('🔍 Vérification de la configuration pour Vercel...\n');

// Vérifier la présence des fichiers essentiels
const requiredFiles = [
  'package.json',
  'next.config.ts',
  'tsconfig.json',
  'vercel.json',
  'src/app/layout.tsx',
  'src/app/page.tsx'
];

console.log('📁 Vérification des fichiers requis:');
requiredFiles.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`${exists ? '✅' : '❌'} ${file}`);
  if (!exists) {
    console.error(`   Fichier manquant: ${file}`);
  }
});

// Vérifier package.json
console.log('\n📦 Vérification du package.json:');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  const requiredScripts = ['dev', 'build', 'start'];
  requiredScripts.forEach(script => {
    const hasScript = packageJson.scripts && packageJson.scripts[script];
    console.log(`${hasScript ? '✅' : '❌'} Script "${script}"`);
  });
  
  const requiredDeps = ['next', 'react', 'react-dom'];
  requiredDeps.forEach(dep => {
    const hasDep = packageJson.dependencies && packageJson.dependencies[dep];
    console.log(`${hasDep ? '✅' : '❌'} Dépendance "${dep}"`);
  });
  
} catch (error) {
  console.error('❌ Erreur lors de la lecture du package.json:', error.message);
}

// Vérifier la structure src/
console.log('\n📂 Vérification de la structure src/:');
const srcPath = 'src';
if (fs.existsSync(srcPath)) {
  const srcContents = fs.readdirSync(srcPath);
  console.log('✅ Dossier src/ existe');
  console.log(`   Contenu: ${srcContents.join(', ')}`);
} else {
  console.error('❌ Dossier src/ manquant');
}

// Vérifier next.config.ts
console.log('\n⚙️ Vérification de next.config.ts:');
try {
  const nextConfig = fs.readFileSync('next.config.ts', 'utf8');
  if (nextConfig.includes('NextConfig')) {
    console.log('✅ Configuration Next.js valide');
  } else {
    console.log('⚠️ Configuration Next.js basique');
  }
} catch (error) {
  console.error('❌ Erreur lors de la lecture de next.config.ts:', error.message);
}

// Vérifier vercel.json
console.log('\n🚀 Vérification de vercel.json:');
try {
  const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
  const requiredVercelProps = ['framework', 'buildCommand'];
  requiredVercelProps.forEach(prop => {
    const hasProp = vercelConfig[prop];
    console.log(`${hasProp ? '✅' : '❌'} Propriété "${prop}"`);
  });
} catch (error) {
  console.error('❌ Erreur lors de la lecture de vercel.json:', error.message);
}

console.log('\n📋 Variables d\'environnement requises pour Vercel:');
const requiredEnvVars = [
  'NEXT_PUBLIC_BASE_URL',
  'STRIPE_SECRET_KEY',
  'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY'
];

requiredEnvVars.forEach(envVar => {
  console.log(`🔧 ${envVar} (à configurer dans Vercel)`);
});

console.log('\n🎯 Instructions pour Vercel:');
console.log('1. Connectez votre dépôt GitHub à Vercel');
console.log('2. Configurez les variables d\'environnement dans les paramètres Vercel');
console.log('3. Utilisez les clés Stripe de test pour commencer');
console.log('4. Déployez sur la région cdg1 (France)');

console.log('\n✅ Vérification terminée !'); 