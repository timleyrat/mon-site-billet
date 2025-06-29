# Configuration Stripe pour BilletLibre

Ce guide vous explique comment configurer Stripe pour votre projet BilletLibre.

## 📋 Prérequis

1. Un compte Stripe (gratuit)
2. Node.js et npm installés
3. Le projet Next.js configuré

## 🔑 Configuration des clés Stripe

### 1. Créer un compte Stripe

1. Allez sur [stripe.com](https://stripe.com)
2. Créez un compte gratuit
3. Accédez au Dashboard Stripe

### 2. Récupérer vos clés API

1. Dans le Dashboard Stripe, allez dans **Developers > API keys**
2. Copiez vos clés :
   - **Publishable key** (commence par `pk_test_` ou `pk_live_`)
   - **Secret key** (commence par `sk_test_` ou `sk_live_`)

### 3. Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine de votre projet :

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Application Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

⚠️ **Important** : 
- Utilisez les clés de test (`sk_test_`, `pk_test_`) pour le développement
- Utilisez les clés de production (`sk_live_`, `pk_live_`) uniquement en production
- Ne partagez jamais vos clés secrètes

## 🔧 Configuration des Webhooks

### 1. Configurer un webhook local (développement)

1. Installez Stripe CLI : [stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli)
2. Connectez-vous : `stripe login`
3. Écoutez les webhooks : `stripe listen --forward-to localhost:3000/api/webhooks/stripe`

### 2. Configurer un webhook en production

1. Dans le Dashboard Stripe, allez dans **Developers > Webhooks**
2. Cliquez sur **Add endpoint**
3. URL : `https://votre-domaine.com/api/webhooks/stripe`
4. Événements à écouter :
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`

## 🧪 Tester la configuration

### 1. Vérifier la configuration

```bash
npm run check-stripe
```

Ce script vérifie :
- ✅ Présence du fichier `.env.local`
- ✅ Variables d'environnement requises
- ✅ Format des clés Stripe
- ✅ Dépendances installées

### 2. Tester avec des cartes de test

Utilisez ces cartes de test Stripe :

| Numéro | Type | Résultat |
|--------|------|----------|
| `4242 4242 4242 4242` | Visa | Paiement réussi |
| `4000 0000 0000 0002` | Visa | Paiement refusé |
| `4000 0025 0000 3155` | Visa | 3D Secure requis |

## 📁 Structure des fichiers

```
src/
├── lib/
│   ├── stripe.ts          # Configuration Stripe côté serveur
│   └── env.ts             # Validation des variables d'environnement
├── hooks/
│   └── useStripe.ts       # Hook pour Stripe côté client
├── app/
│   └── api/
│       ├── create-checkout-session/
│       │   └── route.ts   # API pour créer une session de paiement
│       └── webhooks/
│           └── stripe/
│               └── route.ts # API pour les webhooks Stripe
└── components/
    └── TicketCard.tsx     # Composant d'achat de billet
```

## 🚀 Utilisation

### 1. Côté serveur (API Routes)

```typescript
import { createCheckoutSession } from '@/lib/stripe';

// Créer une session de paiement
const session = await createCheckoutSession(ticket, quantity);
```

### 2. Côté client (React)

```typescript
import { useStripeCheckout } from '@/hooks/useStripe';

function MyComponent() {
  const { redirectToCheckout, loading } = useStripeCheckout();
  
  const handlePurchase = async () => {
    try {
      await redirectToCheckout(sessionId);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };
}
```

## 💰 Commission

Le système prélève automatiquement une commission de **10%** sur chaque vente. Cette commission est :
- Calculée dynamiquement sur le prix du billet
- Le vendeur reçoit 90% du montant original
- La plateforme garde 10% du montant original
- Affichée séparément dans Stripe Checkout
- Gérée automatiquement par les webhooks

### Exemple de calcul :
- Prix du billet : 50€
- Commission (10%) : 5€
- Montant total payé : 55€
- Vendeur reçoit : 45€ (90% de 50€)
- Plateforme garde : 5€ (10% de 50€)

## 🔒 Sécurité

- ✅ Clés secrètes uniquement côté serveur
- ✅ Validation des webhooks avec signature
- ✅ Validation des données d'entrée
- ✅ Gestion d'erreurs robuste

## 📞 Support

En cas de problème :
1. Vérifiez les logs de la console
2. Utilisez `npm run check-stripe`
3. Consultez la [documentation Stripe](https://stripe.com/docs)
4. Vérifiez les webhooks dans le Dashboard Stripe 