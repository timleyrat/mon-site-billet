'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Ticket, getStripe } from '@/lib/stripe';
import { Calendar, MapPin, Euro, ShoppingCart } from 'lucide-react';

interface TicketCardProps {
  ticket: Ticket;
}

export default function TicketCard({ ticket }: TicketCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const totalWithQuantity = ticket.price * quantity;

  const handlePurchase = async () => {
    if (quantity > ticket.quantity) {
      alert('Quantité demandée non disponible');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ticket,
          quantity,
        }),
      });

      const { sessionId, error } = await response.json();

      if (error) {
        throw new Error(error);
      }

      // Utiliser la promesse Stripe unique
      const stripe = await getStripe();
      
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          throw error;
        }
      } else {
        throw new Error('Stripe n\'a pas pu être initialisé');
      }
    } catch (error) {
      console.error('Erreur lors de la création de la session:', error);
      alert('Erreur lors de la création de la session de paiement');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">{ticket.title}</CardTitle>
            <CardDescription className="mt-2">{ticket.description}</CardDescription>
          </div>
          <Badge variant="secondary" className="ml-2">
            {ticket.quantity} disponible{ticket.quantity > 1 ? 's' : ''}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{new Date(ticket.eventDate).toLocaleDateString('fr-FR')}</span>
        </div>

        <div className="flex items-center space-x-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{ticket.location}</span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center space-x-2">
            <Euro className="w-4 h-4 text-blue-600" />
            <span className="text-lg font-semibold">{ticket.price / 100}€</span>
          </div>
          <span className="text-sm text-gray-500">Prix final</span>
        </div>

        {quantity > 1 && (
          <div className="text-center text-sm text-gray-600">
            Total: {totalWithQuantity / 100}€ ({quantity} × {ticket.price / 100}€)
          </div>
        )}

        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
            className="border border-gray-300 rounded px-3 py-1 text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            -
          </button>
          <span className="w-8 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(ticket.quantity, quantity + 1))}
            disabled={quantity >= ticket.quantity}
            className="border border-gray-300 rounded px-3 py-1 text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>
      </CardContent>

      <CardFooter>
        <button
          onClick={handlePurchase}
          disabled={isLoading || ticket.quantity === 0}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Chargement...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <ShoppingCart className="w-4 h-4" />
              <span>Acheter maintenant</span>
            </div>
          )}
        </button>
      </CardFooter>
    </Card>
  );
} 