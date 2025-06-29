'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Euro, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface Transaction {
  id: string;
  sessionId: string;
  ticketId: string;
  sellerId: string;
  amount: number;
  commission: number;
  sellerAmount: number;
  originalPrice: number;
  createdAt: string;
  status: string;
}

export default function AdminTransfersPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [transferring, setTransferring] = useState<string | null>(null);

  useEffect(() => {
    fetchPendingTransactions();
  }, []);

  const fetchPendingTransactions = async () => {
    try {
      const response = await fetch('/api/transfer-to-seller');
      const data = await response.json();
      setTransactions(data.transactions || []);
    } catch (error) {
      console.error('Erreur lors de la récupération des transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTransfer = async (sessionId: string, sellerId: string, amount: number) => {
    setTransferring(sessionId);
    
    try {
      const response = await fetch('/api/transfer-to-seller', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          sellerId,
          amount,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Transfert effectué avec succès !');
        fetchPendingTransactions(); // Recharger la liste
      } else {
        alert(`Erreur: ${data.error}`);
      }
    } catch (error) {
      console.error('Erreur lors du transfert:', error);
      alert('Erreur lors du transfert');
    } finally {
      setTransferring(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('fr-FR');
  };

  const formatAmount = (amount: number) => {
    return (amount / 100).toFixed(2);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des transactions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gestion des transferts
          </h1>
          <p className="text-gray-600">
            Transférer manuellement l'argent aux vendeurs après validation des billets
          </p>
        </div>

        {transactions.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Aucune transaction en attente
              </h3>
              <p className="text-gray-600">
                Tous les transferts ont été effectués ou aucune transaction n'est en attente.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {transactions.map((transaction) => (
              <Card key={transaction.id} className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">
                        Transaction #{transaction.id.slice(-8)}
                      </CardTitle>
                      <CardDescription>
                        Session: {transaction.sessionId.slice(-12)} | 
                        Ticket: {transaction.ticketId} | 
                        Vendeur: {transaction.sellerId}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      En attente
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm text-gray-600">Prix original</div>
                      <div className="text-lg font-semibold flex items-center">
                        <Euro className="w-4 h-4 mr-1" />
                        {formatAmount(transaction.originalPrice)}€
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm text-gray-600">Commission (10%)</div>
                      <div className="text-lg font-semibold text-red-600 flex items-center">
                        <Euro className="w-4 h-4 mr-1" />
                        {formatAmount(transaction.commission)}€
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm text-gray-600">Pour le vendeur (90%)</div>
                      <div className="text-lg font-semibold text-green-600 flex items-center">
                        <Euro className="w-4 h-4 mr-1" />
                        {formatAmount(transaction.sellerAmount)}€
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-sm text-gray-600">Total payé</div>
                      <div className="text-lg font-semibold flex items-center">
                        <Euro className="w-4 h-4 mr-1" />
                        {formatAmount(transaction.amount)}€
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        Créé le {formatDate(transaction.createdAt)}
                      </div>
                      
                      <button
                        onClick={() => handleTransfer(
                          transaction.sessionId,
                          transaction.sellerId,
                          transaction.sellerAmount
                        )}
                        disabled={transferring === transaction.sessionId}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {transferring === transaction.sessionId ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Transfert...</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            <span>Transférer {formatAmount(transaction.sellerAmount)}€</span>
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 