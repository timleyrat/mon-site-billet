"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MessageCircle, HelpCircle, Shield, CreditCard, Users } from "lucide-react"

export default function Support() {
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
          <Link href="/comment-ca-marche" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Comment ça marche
          </Link>
          <Link href="/support" className="text-sm font-medium text-blue-600 transition-colors">
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
                  Support & Aide
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                  Nous sommes là pour vous aider. Trouvez rapidement la réponse à vos questions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 mb-4">
                Contactez-nous
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Notre équipe est disponible pour vous accompagner
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="flex flex-col items-center space-y-4 p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Mail className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Email</h3>
                  <p className="text-gray-600 text-center">
                    support@billetlibre.com
                  </p>
                  <p className="text-sm text-gray-500 text-center">
                    Réponse sous 24h
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="flex flex-col items-center space-y-4 p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Phone className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Téléphone</h3>
                  <p className="text-gray-600 text-center">
                    01 23 45 67 89
                  </p>
                  <p className="text-sm text-gray-500 text-center">
                    Lun-Ven 9h-18h
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="flex flex-col items-center space-y-4 p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Chat en ligne</h3>
                  <p className="text-gray-600 text-center">
                    Support en temps réel
                  </p>
                  <p className="text-sm text-gray-500 text-center">
                    Disponible 24/7
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 mb-4">
                Questions fréquentes
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Trouvez rapidement la réponse à vos questions
              </p>
            </div>

            <div className="grid gap-6 max-w-4xl mx-auto">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-blue-600" />
                    Comment acheter un billet ?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Parcourez notre catalogue de billets, sélectionnez celui qui vous intéresse, 
                    vérifiez les détails et effectuez le paiement en toute sécurité via Stripe.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-blue-600" />
                    Comment vendre un billet ?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Créez un compte vendeur, ajoutez les détails de votre billet, 
                    fixez votre prix et attendez qu'un acheteur se manifeste.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    Mes paiements sont-ils sécurisés ?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Oui, tous les paiements sont sécurisés via Stripe avec cryptage bancaire. 
                    Nous ne stockons jamais vos informations de carte bancaire.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    Que faire en cas de problème ?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Contactez notre support par email, téléphone ou chat en ligne. 
                    Nous vous rembourserons en cas de problème avéré.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    Comment vérifier l'authenticité d'un billet ?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Tous nos vendeurs sont vérifiés et notés. Les billets sont contrôlés 
                    avant mise en vente. En cas de doute, contactez notre support.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-blue-600" />
                    Quels sont les frais de commission ?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Nous prélevons une commission de 10% sur chaque vente pour couvrir 
                    les frais de plateforme et assurer la sécurité des transactions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4 max-w-2xl">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
                  Besoin d'aide supplémentaire ?
                </h2>
                <p className="text-gray-600 text-lg">
                  Notre équipe est là pour vous accompagner à chaque étape
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="mailto:support@billetlibre.com">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 text-lg rounded-md transition-colors">
                    Nous contacter
                  </button>
                </a>
                <Link href="/comment-ca-marche">
                  <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 text-lg rounded-md transition-colors">
                    En savoir plus
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