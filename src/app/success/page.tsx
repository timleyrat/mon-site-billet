"use client"

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Download, Mail, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Star, Shield, CheckCircle2, Clock } from "lucide-react"

interface GeneratedTicket {
  id: string;
  ticketId: string;
  sessionId: string;
  buyerEmail?: string;
  buyerName?: string;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
  price: number;
  quantity: number;
  ticketNumber: string;
  qrCode: string;
  pdfUrl?: string;
  createdAt: Date;
  isDownloaded: boolean;
}

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [ticket, setTicket] = useState<GeneratedTicket | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (sessionId) {
      fetchTicket(sessionId);
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  const fetchTicket = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/tickets/${sessionId}`);
      if (response.ok) {
        const data = await response.json();
        setTicket(data.ticket);
      } else {
        setError('Billet non trouvé');
      }
    } catch (err) {
      setError('Erreur lors de la récupération du billet');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!ticket?.pdfUrl) {
      setError('Billet non disponible pour le téléchargement');
      return;
    }

    setDownloading(true);
    try {
      // Marquer le billet comme téléchargé
      await fetch(`/api/tickets/${sessionId}`, {
        method: 'POST',
      });

      // Télécharger le PDF
      const response = await fetch(ticket.pdfUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `billet-${ticket.ticketNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Mettre à jour l'état local
      setTicket(prev => prev ? { ...prev, isDownloaded: true } : null);
    } catch (err) {
      setError('Erreur lors du téléchargement');
      console.error('Erreur de téléchargement:', err);
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Génération de votre billet...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="max-w-md w-full mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Erreur
            </h1>
            
            <p className="text-gray-600 mb-6">
              {error}
            </p>

            <Link href="/tickets">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition-colors">
                Retour aux billets
              </button>
            </Link>
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

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Message de succès */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Paiement confirmé !
            </h1>
            <p className="text-lg text-gray-600">
              Vos billets ont été générés avec succès et sont prêts à être téléchargés.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Détails de la commande */}
            <div className="lg:col-span-2 space-y-6">
              {/* Résumé de l'événement */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <img
                      src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=150&fit=crop"
                      alt="PSG vs Real Madrid"
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-gray-900 mb-2">
                        PSG vs Real Madrid - Ligue des Champions
                      </h2>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Samedi 15 décembre 2024 à 21:00
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          Parc des Princes, Paris
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Football</Badge>
                        <Badge className="bg-blue-600 text-white">Confirmé</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Détails des billets */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Détails de vos billets</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div>
                        <div className="font-semibold">Tribune Auteuil - Rang A - Siège 15</div>
                        <div className="text-sm text-gray-600">1 billet × 89€</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">89€</div>
                        <div className="text-sm text-blue-600">E-billet disponible</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div>
                        <div className="font-semibold">Tribune Paris - Rang B - Siège 22</div>
                        <div className="text-sm text-gray-600">1 billet × 120€</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">120€</div>
                        <div className="text-sm text-blue-600">E-billet disponible</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <div className="font-semibold text-lg">Total payé</div>
                      <div className="font-bold text-xl text-blue-600">209€</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Instructions */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Prochaines étapes</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-600 text-sm font-bold">1</span>
                      </div>
                      <div>
                        <div className="font-semibold">Téléchargez vos billets</div>
                        <div className="text-sm text-gray-600">
                          Vos e-billets sont prêts. Téléchargez-les et gardez-les en sécurité.
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-600 text-sm font-bold">2</span>
                      </div>
                      <div>
                        <div className="font-semibold">Préparez-vous pour l'événement</div>
                        <div className="text-sm text-gray-600">
                          Arrivez 30 minutes avant l'ouverture des portes avec vos billets imprimés ou sur votre téléphone.
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-600 text-sm font-bold">3</span>
                      </div>
                      <div>
                        <div className="font-semibold">Profitez de l'événement !</div>
                        <div className="text-sm text-gray-600">
                          Votre place est garantie. Amusez-vous bien !
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Actions rapides */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Actions rapides</h3>
                  <div className="space-y-3">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger les billets
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
                </CardContent>
              </Card>

              {/* Informations importantes */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Informations importantes</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">Billets authentiques</div>
                        <div className="text-xs text-gray-600">100% garantis et vérifiés</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">Livraison instantanée</div>
                        <div className="text-xs text-gray-600">E-billets disponibles immédiatement</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm">Support disponible</div>
                        <div className="text-xs text-gray-600">Assistance 24/7 si nécessaire</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact support */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Besoin d'aide ?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Notre équipe support est là pour vous aider avec vos billets.
                  </p>
                  <Link href="/support">
                    <Button variant="outline" className="w-full">
                      Contacter le support
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Section commission transparente */}
          <Card className="border-0 shadow-lg mt-8">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Commission transparente</h3>
                <p className="text-gray-600 mb-4">
                  Le prix que vous avez payé est le prix final. Aucune commission supplémentaire n'a été ajoutée.
                </p>
                <div className="flex items-center justify-center gap-6 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-blue-600 mr-1" />
                    <span>Prix affiché = Prix final</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-blue-600 mr-1" />
                    <span>Aucun frais caché</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-blue-600 mr-1" />
                    <span>Commission prélevée sur le vendeur</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessPageContent />
    </Suspense>
  );
} 