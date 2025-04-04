import React, { createContext, useContext, useState } from 'react';

const WishlistContext = createContext(undefined);

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToWishlist = (item) => {
    setItems(prevItems => {
      if (!prevItems.find(i => i.id === item.id)) {
        return [...prevItems, item];
      }
      return prevItems;
    });
  };

  const removeFromWishlist = (itemId) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const isInWishlist = (itemId) => {
    return items.some(item => item.id === itemId);
  };

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
