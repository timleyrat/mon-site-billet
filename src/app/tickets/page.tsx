"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Calendar, MapPin, Star, Users, Clock, Plus } from "lucide-react"
import Link from "next/link"
import { useState, useMemo } from "react"

// Données d'événements (vide pour la production)
const events: any[] = [];

// Filtres avec compteurs dynamiques
const categories = [
  { name: 'Tous', value: 'all', count: 0 },
  { name: 'Football', value: 'football', count: 0 },
  { name: 'Concert', value: 'concert', count: 0 },
  { name: 'Tennis', value: 'tennis', count: 0 },
  { name: 'Cinéma', value: 'cinema', count: 0 },
  { name: 'Théâtre', value: 'theatre', count: 0 },
  { name: 'Festival', value: 'festival', count: 0 },
  { name: 'Basketball', value: 'basketball', count: 0 }
];

const priceRanges = [
  { label: 'Tous les prix', min: 0, max: 1000 },
  { label: 'Moins de 50€', min: 0, max: 50 },
  { label: '50€ - 100€', min: 50, max: 100 },
  { label: '100€ - 200€', min: 100, max: 200 },
  { label: 'Plus de 200€', min: 200, max: 1000 }
];

const dateRanges = [
  { label: 'Toutes les dates', value: 'all' },
  { label: 'Cette semaine', value: 'week' },
  { label: 'Ce mois', value: 'month' },
  { label: 'Dans 3 mois', value: '3months' }
];

export default function TicketsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['all']);
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [selectedDateRange, setSelectedDateRange] = useState('all');
  const [selectedRating, setSelectedRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  // Filtrage des événements (vide pour la production)
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      // Filtre par recherche
      const matchesSearch = searchTerm === "" || 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase());

      // Filtre par catégorie
      const matchesCategory = selectedCategories.includes('all') || 
        selectedCategories.includes(event.category);

      // Filtre par prix
      const priceRange = priceRanges[selectedPriceRange];
      const matchesPrice = event.price >= priceRange.min && event.price <= priceRange.max;

      // Filtre par date
      const matchesDate = true; // Simplifié pour la production

      // Filtre par note
      const matchesRating = selectedRating === 0 || event.rating >= selectedRating;

      return matchesSearch && matchesCategory && matchesPrice && matchesDate && matchesRating;
    });
  }, [searchTerm, selectedCategories, selectedPriceRange, selectedDateRange, selectedRating]);

  // Gestion des catégories
  const handleCategoryChange = (categoryValue: string) => {
    if (categoryValue === 'all') {
      setSelectedCategories(['all']);
    } else {
      setSelectedCategories(prev => {
        const newCategories = prev.filter(c => c !== 'all');
        if (newCategories.includes(categoryValue)) {
          return newCategories.filter(c => c !== categoryValue);
        } else {
          return [...newCategories, categoryValue];
        }
      });
    }
  };

  // Mise à jour des compteurs de catégories
  const updatedCategories = categories.map(category => ({
    ...category,
    count: category.value === 'all' ? filteredEvents.length : 
           events.filter(e => e.category === category.value).length
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec recherche */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Barre de recherche */}
            <div className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher un événement, un artiste ou un lieu..."
                  className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
            </div>
            
            {/* Boutons filtres et recherche */}
            <div className="flex gap-2">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 border rounded-lg transition-colors text-sm sm:text-base ${
                  showFilters 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filtres</span>
                <span className="sm:hidden">Filtres</span>
              </button>
              <button className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base">
                Rechercher
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 sm:py-6">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Sidebar avec filtres */}
          <div className={`lg:w-64 space-y-4 sm:space-y-6 transition-all duration-300 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            {/* Catégories */}
            <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
              <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Catégories</h3>
              <div className="space-y-1 sm:space-y-2">
                {updatedCategories.map((category) => (
                  <label key={category.value} className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded text-sm sm:text-base">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        className="rounded text-blue-600"
                        checked={selectedCategories.includes(category.value)}
                        onChange={() => handleCategoryChange(category.value)}
                      />
                      <span>{category.name}</span>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500">{category.count}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Fourchette de prix */}
            <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
              <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Prix</h3>
              <div className="space-y-1 sm:space-y-2">
                {priceRanges.map((range, index) => (
                  <label key={index} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded text-sm sm:text-base">
                    <input 
                      type="radio" 
                      name="price" 
                      className="text-blue-600"
                      checked={selectedPriceRange === index}
                      onChange={() => setSelectedPriceRange(index)}
                    />
                    <span className="ml-2">{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Date */}
            <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
              <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Date</h3>
              <div className="space-y-1 sm:space-y-2">
                {dateRanges.map((range) => (
                  <label key={range.value} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded text-sm sm:text-base">
                    <input 
                      type="radio" 
                      name="date" 
                      className="text-blue-600"
                      checked={selectedDateRange === range.value}
                      onChange={() => setSelectedDateRange(range.value)}
                    />
                    <span className="ml-2">{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Note */}
            <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
              <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Note minimum</h3>
              <div className="space-y-1 sm:space-y-2">
                {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                  <label key={rating} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded text-sm sm:text-base">
                    <input 
                      type="radio" 
                      name="rating" 
                      className="text-blue-600"
                      checked={selectedRating === rating}
                      onChange={() => setSelectedRating(selectedRating === rating ? 0 : rating)}
                    />
                    <div className="ml-2 flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1">{rating}+</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Bouton pour réinitialiser les filtres */}
            <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm">
              <button 
                onClick={() => {
                  setSelectedCategories(['all']);
                  setSelectedPriceRange(0);
                  setSelectedDateRange('all');
                  setSelectedRating(0);
                  setSearchTerm("");
                }}
                className="w-full px-3 sm:px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                Réinitialiser les filtres
              </button>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="flex-1">
            {/* En-tête des résultats */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Événements</h1>
                <p className="text-gray-600">{filteredEvents.length} événements trouvés</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Trier par :</span>
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                  <option>Pertinence</option>
                  <option>Prix croissant</option>
                  <option>Prix décroissant</option>
                  <option>Date</option>
                  <option>Note</option>
                </select>
              </div>
            </div>

            {/* État vide - Site prêt pour la production */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-12 text-center">
                <div className="text-6xl mb-4">🎫</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Aucun événement disponible
                </h2>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Il n'y a actuellement aucun événement disponible. Soyez le premier à créer un événement et commencez à vendre vos billets !
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/creer-evenement">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Créer un événement
                    </button>
                  </Link>
                  <Link href="/">
                    <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-6 rounded-lg transition-colors">
                      Retour à l'accueil
                    </button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 