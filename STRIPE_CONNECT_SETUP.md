# Configuration Stripe Connect pour BilletLibre

Ce guide explique la configuration de Stripe Connect avec paiement différé pour BilletLibre.

## 🔄 Nouveau système de paiement

### Avant (Système simple)
- Paiement direct du client au vendeur
- Commission prélevée automatiquement
- Transfert immédiat

### Maintenant (Stripe Connect + Paiement différé)
- Paiement du client vers la plateforme
- L'argent reste sur le compte de la plateforme
- Transfert manuel au vendeur après validation
- Commission de 10% calculée dynamiquement

## 🏗️ Architecture Stripe Connect

### 1. Comptes Stripe Connect Express
Chaque vendeur a un compte Stripe Connect Express qui permet :
- Recevoir des transferts de la plateforme
- Gérer leurs informations bancaires
- Consulter leur solde

### 2. Flux de paiement
```
Client → Paiement → Plateforme (Stripe) → Transfert manuel → Vendeur (Connect)
```

### 3. Gestion des commissions
- **Commission** : 10% du prix du billet
- **Vendeur reçoit** : 90% du prix du billet
- **Plateforme garde** : 10% du prix du billet

## 📁 Structure des fichiers

```
src/
├── lib/
│   ├── stripe.ts              # Configuration Stripe de base
│   └── stripe-connect.ts      # Gestion Stripe Connect + simulation
├── app/
│   ├── api/
│   │   ├── create-checkout-session/
│   │   │   └── route.ts       # Création de session avec Connect
│   │   ├── transfer-to-seller/
│   │   │   └── route.ts       # API pour transferts manuels
│   │   └── webhooks/
│   │       └── stripe/
│   │           └── route.ts   # Webhooks avec gestion des transactions
│   └── admin/
│       ├── transfers/
│       │   └── page.tsx       # Interface de gestion des transferts
│       └── sellers/
│           └── page.tsx       # Interface de gestion des vendeurs
```

## 🔧 Configuration requise

### Variables d'environnement
```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Application Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Permissions Stripe Connect
Votre compte Stripe doit avoir les permissions pour :
- Créer des comptes Connect Express
- Effectuer des transferts
- Gérer les application fees

## 🚀 Utilisation

### 1. Création d'un compte vendeur
```typescript
import { createSellerConnectAccount } from '@/lib/stripe-connect';

const accountId = await createSellerConnectAccount('seller_123');
```

### 2. Création d'une session de paiement
```typescript
import { createConnectCheckoutSession } from '@/lib/stripe-connect';

const session = await createConnectCheckoutSession(ticket, quantity);
```

### 3. Transfert manuel au vendeur
```typescript
import { transferToSeller } from '@/lib/stripe-connect';

const success = await transferToSeller(sellerId, amount, sessionId);
```

## 💰 Gestion des transactions

### Statuts des transactions
- **pending** : Paiement reçu, en attente de transfert
- **transferred** : Transfert effectué au vendeur
- **cancelled** : Transaction annulée

### Interface d'administration
- **Page des transferts** (`/admin/transfers`) : Gérer les transferts manuels
- **Page des vendeurs** (`/admin/sellers`) : Consulter les soldes des vendeurs

## 🔄 Flux complet

### 1. Achat d'un billet
1. Client sélectionne un billet
2. Création d'une session Stripe Connect
3. Client paie via Stripe Checkout
4. L'argent arrive sur le compte de la plateforme
5. Transaction créée avec statut "pending"

### 2. Validation et transfert
1. Administrateur vérifie que le billet a été livré
2. Accès à `/admin/transfers`
3. Clic sur "Transférer" pour le vendeur
4. Transfert automatique de 90% du montant
5. Statut mis à jour à "transferred"

### 3. Suivi des vendeurs
1. Accès à `/admin/sellers`
2. Consultation des soldes des vendeurs
3. Vérification des comptes Stripe Connect

## 🧪 Simulation

Le système utilise une simulation en mémoire pour :
- **Comptes vendeurs** : Map avec données fictives
- **Transactions** : Map avec transactions en attente
- **Transferts** : Simulation des transferts Stripe

### Données de test
```typescript
// Vendeurs simulés
seller_123: Vendeur Jazz Club (solde: 40.50€)
seller_456: Vendeur PSG (solde: 108.00€)
seller_789: Vendeur Festival (solde: 80.10€)
```

## 🔒 Sécurité

- ✅ Validation des webhooks Stripe
- ✅ Vérification des statuts de transaction
- ✅ Gestion des erreurs de transfert
- ✅ Logs détaillés des opérations

## 📊 Monitoring

### Logs importants
- Création de comptes Connect
- Sessions de paiement créées
- Transactions en attente
- Transferts effectués
- Erreurs de transfert

### Métriques à surveiller
- Nombre de transactions en attente
- Montant total des transferts
- Taux de succès des transferts
- Temps moyen de traitement

## 🚨 Points d'attention

### En production
1. **Base de données** : Remplacer les Maps par une vraie DB
2. **Comptes Connect** : Créer de vrais comptes Stripe
3. **Transferts** : Utiliser l'API Stripe réelle
4. **Sécurité** : Ajouter authentification admin
5. **Monitoring** : Implémenter alertes et logs

### Tests
1. Utiliser les cartes de test Stripe
2. Tester les webhooks avec Stripe CLI
3. Vérifier les transferts en mode test
4. Tester les cas d'erreur

## 📞 Support

En cas de problème :
1. Vérifier les logs de la console
2. Consulter le Dashboard Stripe Connect
3. Vérifier les webhooks dans Stripe
4. Tester avec les clés de test 