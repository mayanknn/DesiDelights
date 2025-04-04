import React, { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext(undefined);

export function FavoritesProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToFavorites = (item) => {
    setItems((prevItems) => {
      if (!prevItems.find((i) => i.id === item.id)) {
        return [...prevItems, item];
      }
      return prevItems;
    });
  };

  const removeFromFavorites = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const isInFavorites = (itemId) => {
    return items.some((item) => item.id === itemId);
  };

  return (
    <FavoritesContext.Provider value={{ items, addToFavorites, removeFromFavorites, isInFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
