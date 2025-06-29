"use client"

import { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  isSeller: boolean;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté au chargement
    const savedUser = localStorage.getItem('billetlibre_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Erreur lors du parsing des données utilisateur:', error);
        localStorage.removeItem('billetlibre_user');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('billetlibre_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('billetlibre_user');
  };

  const isAuthenticated = !!user;
  const isSeller = user?.isSeller || false;

  return {
    user,
    loading,
    isAuthenticated,
    isSeller,
    login,
    logout
  };
} 