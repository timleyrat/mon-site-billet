'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Euro, User, Mail, CreditCard, Users } from 'lucide-react';

interface SellerAccount {
  id: string;
  email: string;
  name: string;
  stripeAccountId?: string;
  isVerified: boolean;
  balance: number;
}

export default function AdminSellersPage() {
  const [sellers, setSellers] = useState<SellerAccount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    try {
      // En production, vous feriez un appel API
      // Pour l'instant, aucun vendeur enregistré
      setSellers([]);
    } catch (error) {
      console.error('Erreur lors de la récupération des vendeurs:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (amount: number) => {
    return (amount / 100).toFixed(2);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des vendeurs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gestion des vendeurs
          </h1>
          <p className="text-gray-600">
            Consultez les informations des vendeurs et leurs soldes
          </p>
        </div>

        {sellers.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Aucun vendeur enregistré
              </h3>
              <p className="text-gray-600">
                Aucun vendeur n'a encore créé de compte sur la plateforme.
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sellers.map((seller) => (
                <Card key={seller.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <User className="w-5 h-5" />
                          {seller.name}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-2">
                          <Mail className="w-4 h-4" />
                          {seller.email}
                        </CardDescription>
                      </div>
                      <Badge variant={seller.isVerified ? "default" : "secondary"}>
                        {seller.isVerified ? "Vérifié" : "En attente"}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                          <CreditCard className="w-4 h-4" />
                          Compte Stripe
                        </div>
                        <div className="text-sm font-mono text-gray-800">
                          {seller.stripeAccountId || 'Non configuré'}
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                        <div className="text-sm text-blue-700 flex items-center gap-2 mb-1">
                          <Euro className="w-4 h-4" />
                          Solde disponible
                        </div>
                        <div className="text-2xl font-bold text-blue-800">
                          {formatAmount(seller.balance)}€
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        ID: {seller.id}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Résumé</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{sellers.length}</div>
                      <div className="text-sm text-gray-600">Vendeurs actifs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {formatAmount(sellers.reduce((sum, seller) => sum + seller.balance, 0))}€
                      </div>
                      <div className="text-sm text-gray-600">Total des soldes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {sellers.filter(s => s.isVerified).length}
                      </div>
                      <div className="text-sm text-gray-600">Comptes vérifiés</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 