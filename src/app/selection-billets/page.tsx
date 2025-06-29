"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Star, Shield, CheckCircle, Clock, MapPin, Calendar } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Données d'événement
const event = {
  id: '1',
  title: 'PSG vs Real Madrid - Ligue des Champions',
  category: 'Football',
  date: '2024-12-15T21:00:00Z',
  location: 'Parc des Princes, Paris',
  image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
};

// Options de billets
const ticketOptions = [
  {
    id: 't1',
    section: 'Tribune Auteuil',
    row: 'A',
    seat: '15',
    price: 89,
    available: 2,
    seller: 'Billetterie Officielle',
    sellerRating: 4.9,
    delivery: 'E-billet instantané',
    guarantee: 'Garantie 100%',
    features: ['Vue dégagée', 'Accès handicapé'],
    selected: false
  },
  {
    id: 't2',
    section: 'Tribune Paris',
    row: 'B',
    seat: '22',
    price: 120,
    available: 1,
    seller: 'Premium Tickets',
    sellerRating: 4.8,
    delivery: 'E-billet instantané',
    guarantee: 'Garantie 100%',
    features: ['Vue centrale', 'Siège numéroté'],
    selected: false
  },
  {
    id: 't3',
    section: 'Tribune Boulogne',
    row: 'C',
    seat: '8',
    price: 95,
    available: 3,
    seller: 'EventPro',
    sellerRating: 4.7,
    delivery: 'E-billet instantané',
    guarantee: 'Garantie 100%',
    features: ['Vue latérale', 'Accès VIP'],
    selected: false
  }
];

export default function SelectionBilletsPage() {
  const [selectedTickets, setSelectedTickets] = useState<{[key: string]: number}>({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuantityChange = (ticketId: string, change: number) => {
    const currentQuantity = selectedTickets[ticketId] || 0;
    const newQuantity = Math.max(0, Math.min(currentQuantity + change, ticketOptions.find(t => t.id === ticketId)?.available || 0));
    
    const newSelectedTickets = { ...selectedTickets };
    if (newQuantity === 0) {
      delete newSelectedTickets[ticketId];
    } else {
      newSelectedTickets[ticketId] = newQuantity;
    }
    
    setSelectedTickets(newSelectedTickets);
    
    // Calculer le prix total
    const total = Object.entries(newSelectedTickets).reduce((sum, [ticketId, quantity]) => {
      const ticket = ticketOptions.find(t => t.id === ticketId);
      return sum + (ticket?.price || 0) * quantity;
    }, 0);
    
    setTotalPrice(total);
  };

  const selectedCount = Object.values(selectedTickets).reduce((sum, quantity) => sum + quantity, 0);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      // Simulation de redirection vers Stripe
      await new Promise(resolve => setTimeout(resolve, 2000));
      window.location.href = '/success?type=purchase';
    } catch (error) {
      console.error('Erreur lors du checkout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                BilletLibre
              </Link>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                  Étape 2 sur 3 • Sélection des billets
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              BilletLibre
            </Link>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                Étape 2 sur 3 • Sélection des billets
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-6">
            {/* Résumé de l'événement */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{event.title}</h1>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(event.date).toLocaleDateString('fr-FR')}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {event.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sélection des billets */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold">Sélectionnez vos billets</h2>
                <p className="text-gray-600 mt-1">Choisissez les billets qui vous conviennent</p>
              </div>
              
              <div className="divide-y">
                {ticketOptions.map((ticket) => (
                  <div key={ticket.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{ticket.section}</h3>
                          <Badge variant="outline">Rang {ticket.row} • Siège {ticket.seat}</Badge>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                            {ticket.sellerRating} • {ticket.seller}
                          </div>
                          <div className="text-sm text-blue-600 font-medium">
                            {ticket.delivery} • {ticket.guarantee}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {ticket.features.map((feature) => (
                              <Badge key={feature} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right ml-6">
                        <div className="font-bold text-2xl text-blue-600 mb-2">
                          {ticket.price}€
                        </div>
                        <div className="text-sm text-gray-500 mb-3">
                          {ticket.available} disponible{ticket.available > 1 ? 's' : ''}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQuantityChange(ticket.id, -1)}
                            disabled={!selectedTickets[ticket.id]}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-semibold">
                            {selectedTickets[ticket.id] || 0}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(ticket.id, 1)}
                            disabled={selectedTickets[ticket.id] >= ticket.available}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Garanties */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Nos garanties</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <Shield className="w-6 h-6 text-blue-600 mr-3" />
                  <div>
                    <div className="font-semibold">Paiement sécurisé</div>
                    <div className="text-sm text-gray-600">Transactions protégées</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                  <div>
                    <div className="font-semibold">Billets authentiques</div>
                    <div className="text-sm text-gray-600">100% garantis</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="w-6 h-6 text-blue-600 mr-3" />
                  <div>
                    <div className="font-semibold">Livraison instantanée</div>
                    <div className="text-sm text-gray-600">E-billets immédiats</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Résumé */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Résumé de votre commande</h3>
              
              {selectedCount === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-2">🎫</div>
                  <p>Sélectionnez vos billets</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {Object.entries(selectedTickets).map(([ticketId, quantity]) => {
                    const ticket = ticketOptions.find(t => t.id === ticketId);
                    if (!ticket) return null;
                    
                    return (
                      <div key={ticketId} className="flex justify-between items-center py-2 border-b border-gray-100">
                        <div>
                          <div className="font-medium">{ticket.section}</div>
                          <div className="text-sm text-gray-600">
                            {quantity} billet{quantity > 1 ? 's' : ''} × {ticket.price}€
                          </div>
                        </div>
                        <div className="font-semibold">
                          {quantity * ticket.price}€
                        </div>
                      </div>
                    );
                  })}
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total</span>
                      <span>{totalPrice}€</span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      Commission transparente incluse
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-6 space-y-3">
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700" 
                  disabled={selectedCount === 0}
                  onClick={handleCheckout}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Traitement...
                    </>
                  ) : (
                    'Procéder au paiement'
                  )}
                </Button>
                
                <Link href="/mes-billets">
                  <Button variant="outline" className="w-full">
                    Voir mes billets
                  </Button>
                </Link>
                <Link href="/tickets">
                  <Button variant="outline" className="w-full">
                    Voir d'autres événements
                  </Button>
                </Link>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-2">
                  💡 Conseil: Les prix peuvent varier selon la disponibilité
                </div>
                <div className="text-xs text-gray-500">
                  Vous avez 15 minutes pour finaliser votre commande
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 