"use client"

import { useState, useEffect } from 'react';
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Eye, Share2, Calendar, MapPin, Euro, Users, ArrowRight, Copy, ExternalLink, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/Header"

export default function EvenementPublie() {
  const [eventData, setEventData] = useState({
    id: '',
    title: '',
    category: '',
    date: '',
    time: '',
    location: '',
    address: '',
    description: '',
    price: '',
    quantity: '',
    status: 'En attente de validation'
  });

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Récupérer les données de l'événement depuis localStorage
    const savedEvent = localStorage.getItem('last_created_event');
    if (savedEvent) {
      try {
        const parsedEvent = JSON.parse(savedEvent);
        setEventData(parsedEvent);
      } catch (error) {
        console.error('Erreur lors du parsing des données:', error);
        // Rediriger vers la page de création si pas de données
        window.location.href = '/creer-evenement';
      }
    } else {
      // Rediriger vers la page de création si pas de données
      window.location.href = '/creer-evenement';
    }
  }, []);

  const copyEventLink = () => {
    const eventUrl = `${window.location.origin}/tickets/${eventData.id}`;
    navigator.clipboard.writeText(eventUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareEvent = () => {
    const eventUrl = `${window.location.origin}/tickets/${eventData.id}`;
    const text = `Découvrez cet événement : ${eventData.title}`;
    
    if (navigator.share) {
      navigator.share({
        title: eventData.title,
        text: text,
        url: eventUrl
      });
    } else {
      copyEventLink();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* En-tête de succès */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Événement publié avec succès !
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Votre événement a été créé et est maintenant en attente de validation par notre équipe. 
              Une fois approuvé, il sera visible par tous les acheteurs potentiels.
            </p>
          </div>

          {/* Détails de l'événement */}
          <Card className="border-0 shadow-lg mb-8">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{eventData.title}</h2>
                  <Badge variant="secondary" className="mb-3">
                    {eventData.status}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">ID Événement</p>
                  <p className="font-mono text-sm text-gray-700">{eventData.id}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{eventData.date} à {eventData.time}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Lieu</p>
                    <p className="font-medium">{eventData.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Euro className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Prix</p>
                    <p className="font-medium">{eventData.price}€</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Billets</p>
                    <p className="font-medium">{eventData.quantity} disponibles</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <Button
              onClick={() => window.open(`/tickets/${eventData.id}`, '_blank')}
              className="w-full bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Voir l'événement
            </Button>

            <Button
              onClick={shareEvent}
              variant="outline"
              className="w-full flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Partager
            </Button>

            <Button
              onClick={copyEventLink}
              variant="outline"
              className="w-full flex items-center gap-2"
            >
              <Copy className="w-4 h-4" />
              {copied ? 'Copié !' : 'Copier le lien'}
            </Button>
          </div>

          {/* Prochaines étapes */}
          <Card className="border-0 shadow-lg mb-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Prochaines étapes</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-medium">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Validation par notre équipe</p>
                    <p className="text-sm text-gray-600">
                      Votre événement sera vérifié sous 24-48h pour s'assurer de sa conformité.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-medium">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Publication publique</p>
                    <p className="text-sm text-gray-600">
                      Une fois approuvé, votre événement sera visible sur la page des événements.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-medium">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Réception des commandes</p>
                    <p className="text-sm text-gray-600">
                      Vous recevrez des notifications par email à chaque vente de billet.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions principales */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/creer-evenement">
              <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Créer un autre événement
              </Button>
            </Link>

            <Link href="/tickets">
              <Button variant="outline" className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Voir tous les événements
              </Button>
            </Link>

            <Link href="/">
              <Button variant="outline">
                Retour à l'accueil
              </Button>
            </Link>
          </div>

          {/* Informations importantes */}
          <Card className="border-0 shadow-lg mt-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Informations importantes</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>Vous recevrez un email de confirmation avec les détails de votre événement</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>La commission de 10% sera prélevée automatiquement sur chaque vente</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>Vous pouvez modifier votre événement depuis votre espace vendeur</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>En cas de question, contactez notre support client</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 