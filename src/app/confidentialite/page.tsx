"use client"

import Link from "next/link"

export default function ConfidentialitePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-blue-600">BilletLibre</div>
            <nav className="flex gap-6">
              <Link href="/tickets" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Événements
              </Link>
              <Link href="/admin/transfers" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Admin
              </Link>
              <Link href="/comment-ca-marche" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Comment ça marche
              </Link>
              <Link href="/support" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Support
              </Link>
              <Link href="/connexion" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Connexion
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Politique de confidentialité</h1>
            
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-6">
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Collecte des données</h2>
                <p className="text-gray-700 mb-4">
                  Nous collectons les informations suivantes :
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Informations d'identification (nom, prénom, email)</li>
                  <li>Informations de paiement (traitées par Stripe)</li>
                  <li>Données de navigation et d'utilisation</li>
                  <li>Communications avec notre support</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Utilisation des données</h2>
                <p className="text-gray-700 mb-4">
                  Vos données sont utilisées pour :
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Traiter vos achats et ventes de billets</li>
                  <li>Gérer votre compte utilisateur</li>
                  <li>Vous contacter en cas de problème</li>
                  <li>Améliorer nos services</li>
                  <li>Respecter nos obligations légales</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Protection des données</h2>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Nous mettons en place des mesures de sécurité appropriées pour protéger vos données :
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Chiffrement SSL/TLS pour toutes les communications</li>
                    <li>Stockage sécurisé des données</li>
                    <li>Accès restreint aux données personnelles</li>
                    <li>Surveillance continue de la sécurité</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Partage des données</h2>
                <p className="text-gray-700 mb-4">
                  Nous ne vendons jamais vos données personnelles. Nous pouvons les partager avec :
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Stripe (pour le traitement des paiements)</li>
                  <li>Les autorités (si requis par la loi)</li>
                  <li>Nos prestataires de services (avec votre consentement)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Vos droits</h2>
                <p className="text-gray-700 mb-4">
                  Conformément au RGPD, vous avez le droit de :
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Accéder à vos données personnelles</li>
                  <li>Rectifier vos données inexactes</li>
                  <li>Supprimer vos données</li>
                  <li>Limiter le traitement de vos données</li>
                  <li>Portabilité de vos données</li>
                  <li>Vous opposer au traitement</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookies</h2>
                <p className="text-gray-700 mb-4">
                  Nous utilisons des cookies pour :
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Améliorer votre expérience utilisateur</li>
                  <li>Analyser l'utilisation du site</li>
                  <li>Mémoriser vos préférences</li>
                  <li>Assurer la sécurité du site</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Conservation des données</h2>
                <p className="text-gray-700 mb-4">
                  Nous conservons vos données :
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Pendant la durée de votre compte actif</li>
                  <li>3 ans après la dernière activité (conformité légale)</li>
                  <li>Jusqu'à votre demande de suppression</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Transferts internationaux</h2>
                <p className="text-gray-700 mb-4">
                  Vos données peuvent être transférées vers des pays hors UE (notamment pour Stripe). 
                  Ces transferts sont protégés par des garanties appropriées.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Modifications</h2>
                <p className="text-gray-700 mb-4">
                  Nous pouvons modifier cette politique de confidentialité. 
                  Les modifications seront notifiées par email et publiées sur cette page.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact</h2>
                <p className="text-gray-700 mb-4">
                  Pour toute question sur cette politique ou pour exercer vos droits, contactez-nous :
                </p>
                <a href="mailto:privacy@billetlibre.com" className="text-blue-600 hover:text-blue-700">
                  privacy@billetlibre.com
                </a>
              </section>

              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Note :</strong> Cette politique de confidentialité est un exemple et doit être 
                  adaptée selon vos besoins spécifiques et la réglementation applicable. 
                  Consultez un expert juridique pour valider le contenu final.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 