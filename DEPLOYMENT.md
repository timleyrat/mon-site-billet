# Guide de déploiement BilletLibre sur Vercel

## Prérequis
- Compte GitHub
- Compte Vercel (gratuit)
- Node.js 18+ installé localement

## Configuration pour la production

### Variables d'environnement
Créez un fichier .env.production avec :
```
NEXT_PUBLIC_BASE_URL=https://votre-domaine.vercel.app
NEXT_PUBLIC_APP_MODE=demo
NEXTAUTH_SECRET=votre-secret-jwt-super-securise
NEXTAUTH_URL=https://votre-domaine.vercel.app
NODE_ENV=production
```

## Déploiement sur Vercel

### Méthode 1 : Via l'interface Vercel
1. Allez sur vercel.com
2. Connectez-vous avec GitHub
3. Cliquez sur "New Project"
4. Sélectionnez le repository ticketlibre
5. Configurez les variables d'environnement
6. Cliquez sur "Deploy"

### Méthode 2 : Via CLI Vercel
```bash
npm i -g vercel
vercel login
vercel --prod
```

## Sécurité et optimisations
- Headers de sécurité automatiques
- Compression automatique
- Cache optimisé
- CDN global
- HTTPS automatique

## Domaines personnalisés
1. Dans les paramètres Vercel
2. Allez dans "Domains"
3. Ajoutez votre domaine personnalisé
4. Configurez les DNS selon les instructions

## Mises à jour
- Déploiement automatique à chaque push sur main
- Preview automatique pour les branches
- Déploiement manuel : vercel --prod

## Développement local
```bash
npm install
npm run dev
npm run build
npm start
```

## Dépannage
- Vérifiez les logs de build
- Assurez-vous que toutes les variables d'environnement sont définies
- Testez localement avant de déployer

## Prochaines étapes
1. Testez le déploiement
2. Configurez votre domaine
3. Testez toutes les fonctionnalités
4. Préparez l'activation de Stripe
5. Configurez la base de données

---

**Note** : Ce guide est optimisé pour un déploiement en mode démo. 
Pour la production complète, suivez le guide `PRODUCTION_README.md`. 