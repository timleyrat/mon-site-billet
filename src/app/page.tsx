"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Euro, Star, ArrowRight, Search, Filter, TrendingUp, Shield, Users, Zap } from "lucide-react"
import Header from "@/components/Header"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              La plateforme de revente de billets
              <span className="block text-blue-200">la plus sécurisée</span>
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Achetez et vendez vos billets d'événements en toute confiance. 
              Commission transparente de 10% seulement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tickets">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Search className="w-5 h-5 mr-2" />
                  Trouver des événements
                </Button>
              </Link>
              <Link href="/creer-evenement">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Vendre mes billets
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pourquoi choisir BilletLibre ?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Une plateforme moderne et sécurisée pour tous vos besoins de billets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Billets garantis</h3>
                <p className="text-gray-600">
                  Tous nos billets sont vérifiés et authentifiés. 
                  Garantie de remboursement en cas de problème.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Paiement sécurisé</h3>
                <p className="text-gray-600">
                  Paiements cryptés et sécurisés. 
                  Vos données sont protégées à 100%.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Commission transparente</h3>
                <p className="text-gray-600">
                  Seulement 10% de commission prélevée sur le vendeur. 
                  Le prix affiché est le prix final.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Un processus simple et transparent pour acheter et vendre vos billets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Pour les acheteurs */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-blue-600">Pour les acheteurs</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Parcourir les événements</h4>
                    <p className="text-gray-600">Trouvez l'événement de vos rêves parmi notre sélection</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Payer en sécurité</h4>
                    <p className="text-gray-600">Paiement sécurisé par carte bancaire ou PayPal</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Recevoir vos billets</h4>
                    <p className="text-gray-600">Billets électroniques envoyés immédiatement par email</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pour les vendeurs */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-blue-600">Pour les vendeurs</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Créer votre événement</h4>
                    <p className="text-gray-600">Publiez vos billets en quelques clics</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Attendre les ventes</h4>
                    <p className="text-gray-600">Recevez des notifications à chaque vente</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Être payé</h4>
                    <p className="text-gray-600">Transfert automatique après déduction de la commission</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/comment-ca-marche">
              <Button className="bg-blue-600 hover:bg-blue-700">
                En savoir plus
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à commencer ?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers d'utilisateurs qui font confiance à BilletLibre 
            pour leurs transactions de billets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tickets">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Search className="w-5 h-5 mr-2" />
                Trouver des événements
              </Button>
            </Link>
            <Link href="/creer-evenement">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                <TrendingUp className="w-5 h-5 mr-2" />
                Vendre mes billets
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-blue-600 mb-4">BilletLibre</h3>
              <p className="text-gray-600">
                La plateforme de revente de billets la plus sécurisée et transparente.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Acheteurs</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/tickets" className="hover:text-blue-600">Événements</Link></li>
                <li><Link href="/comment-ca-marche" className="hover:text-blue-600">Comment ça marche</Link></li>
                <li><Link href="/support" className="hover:text-blue-600">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Vendeurs</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/creer-evenement" className="hover:text-blue-600">Créer un événement</Link></li>
                <li><Link href="/comment-ca-marche" className="hover:text-blue-600">Tarifs</Link></li>
                <li><Link href="/support" className="hover:text-blue-600">Aide</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Légal</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/conditions" className="hover:text-blue-600">Conditions d'utilisation</Link></li>
                <li><Link href="/confidentialite" className="hover:text-blue-600">Politique de confidentialité</Link></li>
                <li><Link href="/contact" className="hover:text-blue-600">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2024 BilletLibre. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
