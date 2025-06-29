"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Shield, CreditCard, Users, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CommentCaMarche() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link href="/" className="flex items-center justify-center">
          <div className="text-2xl font-bold text-blue-600">BilletLibre</div>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/tickets" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Billets
          </Link>
          <Link href="/admin/transfers" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Admin
          </Link>
          <Link href="/comment-ca-marche" className="text-sm font-medium text-blue-600 transition-colors">
            Comment ça marche
          </Link>
          <Link href="/support" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Support
          </Link>
          <Link href="/connexion" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Connexion
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 to-green-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4 max-w-3xl">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-gray-900">
                  Comment ça marche ?
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                  Découvrez comment BilletLibre simplifie l'achat et la vente de billets d'événements
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Étapes pour acheter */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 mb-4">
                Acheter un billet
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                En quelques clics, trouvez et achetez le billet de vos rêves
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="flex flex-col items-center space-y-4 p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-600">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Parcourir</h3>
                  <p className="text-gray-600 text-center">
                    Consultez notre catalogue de billets disponibles pour tous types d'événements
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="flex flex-col items-center space-y-4 p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-600">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Choisir</h3>
                  <p className="text-gray-600 text-center">
                    Sélectionnez le billet qui vous convient et vérifiez les détails
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="flex flex-col items-center space-y-4 p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-600">3</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Payer</h3>
                  <p className="text-gray-600 text-center">
                    Effectuez le paiement en toute sécurité via Stripe
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Étapes pour vendre */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 mb-4">
                Vendre un billet
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Transformez vos billets non utilisés en argent facilement
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-4 max-w-6xl mx-auto">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="flex flex-col items-center space-y-4 p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-600">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Créer un compte</h3>
                  <p className="text-gray-600 text-center">
                    Inscrivez-vous et créez votre profil vendeur
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="flex flex-col items-center space-y-4 p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-600">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Ajouter un billet</h3>
                  <p className="text-gray-600 text-center">
                    Décrivez votre billet et fixez votre prix
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="flex flex-col items-center space-y-4 p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-600">3</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Attendre la vente</h3>
                  <p className="text-gray-600 text-center">
                    Votre billet est visible et peut être acheté
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="flex flex-col items-center space-y-4 p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-600">4</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Recevoir l'argent</h3>
                  <p className="text-gray-600 text-center">
                    Le paiement est transféré sur votre compte
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Sécurité et garanties */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 mb-4">
                Sécurité et garanties
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Votre sécurité est notre priorité absolue
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="flex flex-col items-center space-y-4 p-8">
                  <Shield className="w-12 h-12 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">Paiement sécurisé</h3>
                  <p className="text-gray-600 text-center">
                    Cryptage bancaire et protection des données
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="flex flex-col items-center space-y-4 p-8">
                  <CreditCard className="w-12 h-12 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">Garantie de remboursement</h3>
                  <p className="text-gray-600 text-center">
                    Remboursement en cas de problème
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="flex flex-col items-center space-y-4 p-8">
                  <Users className="w-12 h-12 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">Vérification d'identité</h3>
                  <p className="text-gray-600 text-center">
                    Profils vérifiés pour plus de confiance
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="flex flex-col items-center space-y-4 p-8">
                  <CheckCircle className="w-12 h-12 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">Support 24/7</h3>
                  <p className="text-gray-600 text-center">
                    Assistance disponible à tout moment
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4 max-w-2xl">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                  Prêt à commencer ?
                </h2>
                <p className="text-blue-100 text-lg">
                  Rejoignez BilletLibre et commencez à acheter ou vendre vos billets dès aujourd'hui
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/tickets">
                  <button className="bg-white hover:bg-gray-100 text-blue-600 font-semibold py-3 px-8 text-lg rounded-md transition-colors">
                    Voir les billets
                  </button>
                </Link>
                <Link href="/connexion">
                  <button className="border border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-8 text-lg rounded-md transition-colors">
                    Créer un compte
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-gray-50">
        <p className="text-xs text-gray-500">© 2024 BilletLibre. Tous droits réservés.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="/conditions" className="text-xs hover:underline underline-offset-4 text-gray-500">
            Conditions d'utilisation
          </Link>
          <Link href="/confidentialite" className="text-xs hover:underline underline-offset-4 text-gray-500">
            Politique de confidentialité
          </Link>
          <Link href="/contact" className="text-xs hover:underline underline-offset-4 text-gray-500">
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  )
} 