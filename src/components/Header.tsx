"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import { LogOut, User } from "lucide-react"

interface HeaderProps {
  showAuth?: boolean;
}

export default function Header({ showAuth = true }: HeaderProps) {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    // Rediriger vers la page d'accueil après déconnexion
    window.location.href = '/';
  };

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            BilletLibre
          </Link>
          
          <nav className="flex gap-6">
            <Link href="/tickets" className="text-gray-600 hover:text-blue-600">
              Événements
            </Link>
            {isAuthenticated && (
              <Link href="/creer-evenement" className="text-gray-600 hover:text-blue-600">
                Créer un événement
              </Link>
            )}
            <Link href="/admin/transfers" className="text-gray-600 hover:text-blue-600">
              Admin
            </Link>
            <Link href="/admin/events" className="text-gray-600 hover:text-blue-600">
              Événements Admin
            </Link>
            <Link href="/comment-ca-marche" className="text-gray-600 hover:text-blue-600">
              Comment ça marche
            </Link>
            <Link href="/support" className="text-gray-600 hover:text-blue-600">
              Support
            </Link>
            
            {showAuth && (
              <>
                {isAuthenticated ? (
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="w-4 h-4" />
                      <span>{user?.name}</span>
                    </div>
                    <Button
                      onClick={handleLogout}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Déconnexion
                    </Button>
                  </div>
                ) : (
                  <Link href="/connexion" className="text-gray-600 hover:text-blue-600">
                    Connexion
                  </Link>
                )}
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
} 