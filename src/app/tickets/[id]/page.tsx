import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function EventDetailPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              BilletLibre
            </Link>
            <nav className="flex gap-6">
              <Link href="/tickets" className="text-gray-600 hover:text-blue-600">
                Événements
              </Link>
              <Link href="/mes-billets" className="text-gray-600 hover:text-blue-600">
                Mes Billets
              </Link>
              <Link href="/support" className="text-gray-600 hover:text-blue-600">
                Support
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Bouton retour */}
          <Link href="/tickets">
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
              <ArrowLeft className="w-4 h-4" />
              Retour aux événements
            </button>
          </Link>

          {/* État vide */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <div className="text-6xl mb-4">🎫</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Événement non trouvé
              </h1>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                L'événement que vous recherchez n'existe pas ou a été supprimé.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/tickets">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Voir tous les événements
                  </Button>
                </Link>
                <Link href="/creer-evenement">
                  <Button variant="outline">
                    Créer un événement
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 