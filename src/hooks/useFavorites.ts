import { useState, useEffect, useCallback } from 'react';
import type { ExcuseCategory } from '@/data/excuses';

export interface FavoriteExcuse {
  id: string;
  text: string;
  category: ExcuseCategory;
  savedAt: number;
}

const STORAGE_KEY = 'excuse-generator-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteExcuse[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load favorites:', error);
    }
  }, []);

  // Save favorites to localStorage whenever they change
  const saveFavorites = useCallback((newFavorites: FavoriteExcuse[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Failed to save favorites:', error);
    }
  }, []);

  const addFavorite = useCallback((text: string, category: ExcuseCategory) => {
    const newFavorite: FavoriteExcuse = {
      id: `fav-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text,
      category,
      savedAt: Date.now(),
    };
    
    const newFavorites = [newFavorite, ...favorites];
    saveFavorites(newFavorites);
    return newFavorite;
  }, [favorites, saveFavorites]);

  const removeFavorite = useCallback((id: string) => {
    const newFavorites = favorites.filter(fav => fav.id !== id);
    saveFavorites(newFavorites);
  }, [favorites, saveFavorites]);

  const isFavorite = useCallback((text: string) => {
    return favorites.some(fav => fav.text === text);
  }, [favorites]);

  const clearAllFavorites = useCallback(() => {
    saveFavorites([]);
  }, [saveFavorites]);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    clearAllFavorites,
  };
}
