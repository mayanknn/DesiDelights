import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToCart = (item, selectedToppings = []) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);

      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }

      return [...prevItems, { ...item, quantity: 1, selectedToppings }];
    });
  };

  const removeFromCart = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity < 1) {
      removeFromCart(itemId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const total = items.reduce((sum, item) => {
    const itemTotal = item.price * item.quantity;
    const toppingsTotal = item.selectedToppings.reduce((tSum, topping) => {
      const toppingObj = item.additionalToppings?.find(
        (t) => t.name === topping
      );
      const toppingPrice = toppingObj ? toppingObj.price : 0;
      return tSum + toppingPrice * item.quantity;
    }, 0);
    return sum + itemTotal + toppingsTotal;
  }, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
