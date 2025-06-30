"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import { LogOut, User, MessageCircle, Menu } from "lucide-react"
import { useEffect, useState } from "react"

interface HeaderProps {
  showAuth?: boolean;
}

// Définir ici l'email de l'admin
const ADMIN_EMAIL = "admin@billetlibre.fr";

// Stockage en mémoire pour la démo (doit être partagé avec la page messages)
const messageStore = typeof window !== 'undefined' ? (window as any)._msgStore || ((window as any)._msgStore = new Map()) : new Map();

function getUnreadCount(userId: string): number {
  let count = 0;
  messageStore.forEach((msgs: any[], key: string) => {
    msgs.forEach(msg => {
      if (msg.senderId !== userId && !msg.read && key.includes(userId)) count++;
    });
  });
  return count;
}

export default function Header({ showAuth = true }: HeaderProps) {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    // Rediriger vers la page d'accueil après déconnexion
    window.location.href = '/';
  };

  const isAdmin = user?.email === ADMIN_EMAIL;

  // Badge de notification messages non lus
  const [unread, setUnread] = useState(0);
  useEffect(() => {
    if (isAuthenticated && user?.id) {
      setUnread(getUnreadCount(user.id));
      const interval = setInterval(() => setUnread(getUnreadCount(user.id)), 2000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, user?.id]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gray-50 border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600 tracking-tight">
            BilletLibre
          </Link>
          {/* Menu burger mobile */}
          <button className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={() => setMobileMenuOpen(v => !v)} aria-label="Ouvrir le menu">
            <Menu className="w-7 h-7 text-blue-600" />
          </button>
          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/tickets" className="text-gray-700 font-semibold tracking-wide text-base px-3 py-2 rounded hover:bg-blue-50 hover:text-blue-700 transition-colors">
              Événements
            </Link>
            {isAuthenticated && (
              <Link href="/creer-evenement" className="text-gray-700 font-semibold tracking-wide text-base px-3 py-2 rounded hover:bg-blue-50 hover:text-blue-700 transition-colors">
                Créer un événement
              </Link>
            )}
            <Link href="/comment-ca-marche" className="text-gray-700 font-semibold tracking-wide text-base px-3 py-2 rounded hover:bg-blue-50 hover:text-blue-700 transition-colors">
              Comment ça marche
            </Link>
            <Link href="/support" className="text-gray-700 font-semibold tracking-wide text-base px-3 py-2 rounded hover:bg-blue-50 hover:text-blue-700 transition-colors">
              Support
            </Link>
            {/* Onglet Admin visible uniquement pour l'admin */}
            {isAdmin && (
              <Link href="/admin/events" className="text-red-600 font-semibold tracking-wide text-base px-3 py-2 rounded hover:bg-red-50 hover:text-red-700 transition-colors">
                Admin / Évènements
              </Link>
            )}
            {/* Icône messagerie avec badge */}
            {isAuthenticated && user?.id && (
              <Link href="/messages" className="relative group">
                <MessageCircle className="w-6 h-6 text-blue-600 group-hover:text-blue-800 transition-colors" />
                {unread > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5 font-bold shadow">{unread}</span>
                )}
              </Link>
            )}
            {showAuth && (
              <>
                {isAuthenticated ? (
                  <div className="flex items-center gap-4 ml-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="w-4 h-4" />
                      <span className="font-medium">{user?.name}</span>
                    </div>
                    <Button
                      onClick={handleLogout}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 border-gray-300 hover:bg-blue-50 hover:text-blue-700"
                    >
                      <LogOut className="w-4 h-4" />
                      Déconnexion
                    </Button>
                  </div>
                ) : (
                  <Link href="/connexion" className="text-blue-600 font-semibold tracking-wide text-base px-4 py-2 rounded border border-blue-100 bg-white shadow-sm hover:bg-blue-50 hover:text-blue-700 transition-colors ml-2">
                    Connexion
                  </Link>
                )}
              </>
            )}
          </nav>
        </div>
      </div>
      {/* Menu mobile drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute top-0 right-0 w-64 h-full bg-white shadow-lg p-6 flex flex-col gap-4" onClick={e => e.stopPropagation()}>
            <button className="self-end mb-2 text-gray-400 hover:text-gray-700" onClick={() => setMobileMenuOpen(false)} aria-label="Fermer le menu">✕</button>
            <Link href="/tickets" className="text-gray-700 font-semibold tracking-wide text-base px-2 py-2 rounded hover:bg-blue-50 hover:text-blue-700 transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Événements
            </Link>
            {isAuthenticated && (
              <Link href="/creer-evenement" className="text-gray-700 font-semibold tracking-wide text-base px-2 py-2 rounded hover:bg-blue-50 hover:text-blue-700 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Créer un événement
              </Link>
            )}
            <Link href="/comment-ca-marche" className="text-gray-700 font-semibold tracking-wide text-base px-2 py-2 rounded hover:bg-blue-50 hover:text-blue-700 transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Comment ça marche
            </Link>
            <Link href="/support" className="text-gray-700 font-semibold tracking-wide text-base px-2 py-2 rounded hover:bg-blue-50 hover:text-blue-700 transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Support
            </Link>
            {isAdmin && (
              <Link href="/admin/events" className="text-red-600 font-semibold tracking-wide text-base px-2 py-2 rounded hover:bg-red-50 hover:text-red-700 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Admin / Évènements
              </Link>
            )}
            {isAuthenticated && user?.id && (
              <Link href="/messages" className="relative group px-2 py-2" onClick={() => setMobileMenuOpen(false)}>
                <MessageCircle className="w-6 h-6 text-blue-600 group-hover:text-blue-800 transition-colors inline" />
                {unread > 0 && (
                  <span className="absolute -top-2 left-5 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5 font-bold shadow">{unread}</span>
                )}
                <span className="ml-2 align-middle">Messagerie</span>
              </Link>
            )}
            {showAuth && (
              <>
                {isAuthenticated ? (
                  <div className="flex items-center gap-2 mt-2">
                    <User className="w-4 h-4 text-gray-600" />
                    <span className="font-medium text-gray-700">{user?.name}</span>
                    <Button
                      onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 border-gray-300 hover:bg-blue-50 hover:text-blue-700"
                    >
                      <LogOut className="w-4 h-4" />
                      Déconnexion
                    </Button>
                  </div>
                ) : (
                  <Link href="/connexion" className="text-blue-600 font-semibold tracking-wide text-base px-4 py-2 rounded border border-blue-100 bg-white shadow-sm hover:bg-blue-50 hover:text-blue-700 transition-colors mt-2" onClick={() => setMobileMenuOpen(false)}>
                    Connexion
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
} 