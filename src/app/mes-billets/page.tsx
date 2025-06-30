"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Calendar, MapPin, Clock, Search, Filter, Ticket, Home } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function MesBilletsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  // Données vides pour la production - aucun billet fictif
  const userTickets: any[] = [];

  const handleDownload = async (ticketId: string) => {
    setIsLoading(true);
    try {
      // Simulation de téléchargement
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log(`Téléchargement du billet ${ticketId}`);
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTickets = userTickets.filter(ticket => {
    const matchesSearch = ticket.event.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || ticket.status === filter;
    return matchesSearch && matchesFilter;
  });

  const activeTickets = userTickets.filter(t => t.status === 'active');
  const pastTickets = userTickets.filter(t => t.status === 'past');

  if (userTickets.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b sticky top-0 z-40">
          <div className="container mx-auto px-4 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-xl sm:text-2xl font-bold text-blue-600">
                BilletLibre
              </Link>
              <nav className="hidden sm:flex gap-6">
                <Link href="/tickets" className="text-gray-600 hover:text-blue-600">
                  Événements
                </Link>
                <Link href="/mes-billets" className="text-blue-600 font-semibold">
                  Mes Billets
                </Link>
                <Link href="/support" className="text-gray-600 hover:text-blue-600">
                  Support
                </Link>
              </nav>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 sm:p-12 text-center">
                <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🎫</div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Aucun billet trouvé
                </h1>
                <p className="text-gray-600 mb-4 sm:mb-6 max-w-md mx-auto text-sm sm:text-base">
                  Vous n'avez pas encore acheté de billets. Commencez par explorer nos événements !
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Link href="/tickets" className="w-full sm:w-auto">
                    <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                      Voir les événements
                    </Button>
                  </Link>
                  <Link href="/creer-evenement" className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full sm:w-auto">
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl sm:text-2xl font-bold text-blue-600">
              BilletLibre
            </Link>
            <nav className="hidden sm:flex gap-6">
              <Link href="/tickets" className="text-gray-600 hover:text-blue-600">
                Événements
              </Link>
              <Link href="/mes-billets" className="text-blue-600 font-semibold">
                Mes Billets
              </Link>
              <Link href="/support" className="text-gray-600 hover:text-blue-600">
                Support
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto">
          {/* En-tête */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Mes Billets</h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Gérez et téléchargez vos billets d'événements
            </p>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-3 sm:p-4 text-center">
                <div className="text-xl sm:text-2xl font-bold text-blue-600">{userTickets.length}</div>
                <div className="text-xs sm:text-sm text-gray-600">Total</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-3 sm:p-4 text-center">
                <div className="text-xl sm:text-2xl font-bold text-blue-600">{activeTickets.length}</div>
                <div className="text-xs sm:text-sm text-gray-600">Actifs</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-3 sm:p-4 text-center">
                <div className="text-xl sm:text-2xl font-bold text-blue-600">{pastTickets.length}</div>
                <div className="text-xs sm:text-sm text-gray-600">Passés</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-3 sm:p-4 text-center">
                <div className="text-xl sm:text-2xl font-bold text-blue-600">
                  {userTickets.reduce((sum, ticket) => sum + ticket.price, 0)}€
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Valeur totale</div>
              </CardContent>
            </Card>
          </div>

          {/* Filtres et recherche */}
          <Card className="border-0 shadow-lg mb-6 sm:mb-8">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="relative">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Rechercher un événement..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 sm:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={filter === "all" ? "default" : "outline"}
                    onClick={() => setFilter("all")}
                    className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-sm"
                  >
                    Tous
                  </Button>
                  <Button
                    variant={filter === "active" ? "default" : "outline"}
                    onClick={() => setFilter("active")}
                    className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-sm"
                  >
                    Actifs
                  </Button>
                  <Button
                    variant={filter === "past" ? "default" : "outline"}
                    onClick={() => setFilter("past")}
                    className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-sm"
                  >
                    Passés
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Liste des billets */}
          <div className="space-y-6">
            {filteredTickets.length === 0 ? (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-12 text-center">
                  <div className="text-4xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Aucun billet trouvé
                  </h3>
                  <p className="text-gray-600">
                    Aucun billet ne correspond à votre recherche.
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredTickets.map((ticket) => (
                <Card key={ticket.id} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {ticket.event}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(ticket.date).toLocaleDateString('fr-FR')}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {ticket.location}
                              </div>
                            </div>
                          </div>
                          <Badge className="bg-blue-600 text-white">
                            {ticket.status === 'active' ? 'Actif' : 'Passé'}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <div className="text-gray-500">Section</div>
                            <div className="font-semibold">{ticket.section}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Rang</div>
                            <div className="font-semibold">{ticket.row}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Place</div>
                            <div className="font-semibold">{ticket.seat}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Prix</div>
                            <div className="font-semibold text-blue-600">{ticket.price}€</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 lg:ml-6">
                        <Button
                          onClick={() => handleDownload(ticket.id)}
                          disabled={isLoading}
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Télécharger
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Clock className="w-4 h-4 mr-2" />
                          Détails
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Actions rapides */}
          <Card className="border-0 shadow-lg mt-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Actions rapides</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/tickets" className="flex-1">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Ticket className="w-4 h-4 mr-2" />
                    Voir d'autres événements
                  </Button>
                </Link>
                <Link href="/creer-evenement" className="flex-1">
                  <Button variant="outline" className="w-full">
                    <Home className="w-4 h-4 mr-2" />
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