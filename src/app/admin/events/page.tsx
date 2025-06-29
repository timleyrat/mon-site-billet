"use client"

import { useState, useEffect } from 'react';
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Euro, Users, Eye, CheckCircle, XCircle, Clock } from "lucide-react"
import Header from "@/components/Header"

interface Event {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  price: number;
  quantity: number;
  status: string;
  createdAt: string;
}

export default function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des événements');
      }
      const data = await response.json();
      setEvents(data.events || []);
    } catch (error) {
      console.error('Erreur:', error);
      setError('Erreur lors de la récupération des événements');
    } finally {
      setLoading(false);
    }
  };

  const updateEventStatus = async (eventId: string, newStatus: string) => {
    try {
      // Ici vous ajouteriez l'appel API pour mettre à jour le statut
      console.log(`Mise à jour du statut de l'événement ${eventId} vers ${newStatus}`);
      
      // Mise à jour locale pour la démo
      setEvents(prev => prev.map(event => 
        event.id === eventId ? { ...event, status: newStatus } : event
      ));
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'En attente de validation':
        return <Badge variant="secondary" className="flex items-center gap-1"><Clock className="w-3 h-3" /> En attente</Badge>;
      case 'Approuvé':
        return <Badge className="bg-green-100 text-green-800 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Approuvé</Badge>;
      case 'Rejeté':
        return <Badge className="bg-red-100 text-red-800 flex items-center gap-1"><XCircle className="w-3 h-3" /> Rejeté</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement des événements...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* En-tête */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Administration des événements</h1>
            <p className="text-gray-600">
              Gérez tous les événements créés par les vendeurs
            </p>
          </div>

          {error && (
            <Card className="border-0 shadow-lg mb-6">
              <CardContent className="p-4">
                <p className="text-red-600">{error}</p>
              </CardContent>
            </Card>
          )}

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-gray-900">{events.length}</div>
                <div className="text-sm text-gray-600">Total événements</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-blue-600">
                  {events.filter(e => e.status === 'En attente de validation').length}
                </div>
                <div className="text-sm text-gray-600">En attente</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-green-600">
                  {events.filter(e => e.status === 'Approuvé').length}
                </div>
                <div className="text-sm text-gray-600">Approuvés</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-red-600">
                  {events.filter(e => e.status === 'Rejeté').length}
                </div>
                <div className="text-sm text-gray-600">Rejetés</div>
              </CardContent>
            </Card>
          </div>

          {/* Liste des événements */}
          {events.length === 0 ? (
            <Card className="border-0 shadow-lg">
              <CardContent className="p-12 text-center">
                <div className="text-6xl mb-4">📅</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun événement</h3>
                <p className="text-gray-600 mb-6">
                  Aucun événement n'a encore été créé par les vendeurs.
                </p>
                <Link href="/creer-evenement">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Créer un événement de test
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {events.map((event) => (
                <Card key={event.id} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                          {getStatusBadge(event.status)}
                        </div>
                        <p className="text-sm text-gray-500 mb-3">
                          ID: {event.id} | Créé le {formatDate(event.createdAt)}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/tickets/${event.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            Voir
                          </Button>
                        </Link>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">{event.date} à {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Euro className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">{event.price}€</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">{event.quantity} billets</span>
                      </div>
                    </div>

                    {event.status === 'En attente de validation' && (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => updateEventStatus(event.id, 'Approuvé')}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approuver
                        </Button>
                        <Button
                          onClick={() => updateEventStatus(event.id, 'Rejeté')}
                          size="sm"
                          variant="outline"
                          className="text-red-600 border-red-600 hover:bg-red-50"
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Rejeter
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 