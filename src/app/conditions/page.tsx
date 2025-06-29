"use client"

import Link from "next/link"

export default function ConditionsPage() {
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
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Conditions d'utilisation</h1>
            
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-6">
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptation des conditions</h2>
                <p className="text-gray-700 mb-4">
                  En utilisant BilletLibre, vous acceptez d'être lié par ces conditions d'utilisation. 
                  Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description du service</h2>
                <p className="text-gray-700 mb-4">
                  BilletLibre est une plateforme de revente de billets d'événements qui permet aux utilisateurs 
                  d'acheter et de vendre des billets de manière sécurisée.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Commission et frais</h2>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                  <li>Une commission de 10% est prélevée sur chaque vente</li>
                  <li>La commission est déduite du montant reçu par le vendeur</li>
                  <li>L'acheteur paie exactement le prix affiché, sans frais supplémentaires</li>
                  <li>Aucun frais caché n'est appliqué</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Responsabilités des utilisateurs</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Vendeurs</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Garantir l'authenticité des billets vendus</li>
                      <li>Respecter les prix et conditions affichés</li>
                      <li>Livrer les billets dans les délais convenus</li>
                      <li>Ne pas vendre de billets contrefaits</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Acheteurs</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Payer le montant exact affiché</li>
                      <li>Utiliser les billets uniquement pour l'événement prévu</li>
                      <li>Respecter les conditions de l'événement</li>
                      <li>Signaler tout problème dans les 24h</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Garanties et remboursements</h2>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    BilletLibre garantit l'authenticité de tous les billets vendus sur sa plateforme.
                  </p>
                  <p className="text-gray-700">
                    En cas de problème avec un billet, nous nous engageons à :
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Rembourser intégralement l'acheteur</li>
                    <li>Fournir un billet de remplacement si possible</li>
                    <li>Investiguer et sanctionner le vendeur si nécessaire</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Protection des données</h2>
                <p className="text-gray-700 mb-4">
                  Nous nous engageons à protéger vos données personnelles conformément au RGPD. 
                  Consultez notre politique de confidentialité pour plus de détails.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Limitation de responsabilité</h2>
                <p className="text-gray-700 mb-4">
                  BilletLibre ne peut être tenu responsable des dommages indirects, 
                  des pertes de profits ou des interruptions de service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Modifications</h2>
                <p className="text-gray-700 mb-4">
                  Nous nous réservons le droit de modifier ces conditions à tout moment. 
                  Les modifications seront notifiées aux utilisateurs.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact</h2>
                <p className="text-gray-700 mb-4">
                  Pour toute question concernant ces conditions, contactez-nous à :
                </p>
                <a href="mailto:legal@billetlibre.com" className="text-blue-600 hover:text-blue-700">
                  legal@billetlibre.com
                </a>
              </section>

              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Note :</strong> Ces conditions d'utilisation sont un exemple et doivent être 
                  adaptées selon vos besoins juridiques spécifiques. Consultez un avocat pour 
                  valider le contenu final.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 