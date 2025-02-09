import React from 'react';
import { MenuItem } from './MenuItem';
import type { MenuItem as MenuItemType } from '../types';

interface MenuSectionProps {
  title: string;
  items: MenuItemType[];
  favorites: string[];
  wishlist: string[]; // ✅ Ensure wishlist is declared
  onAddToCart: (item: MenuItemType, quantity: number) => void;
  onToggleFavorite: (itemId: string) => void;
  onToggleWishlist: (itemId: string) => void; // ✅ Ensure function is declared
}



export function MenuSection({
  title,
  items,
  favorites,
  wishlist,
  onAddToCart,
  onToggleFavorite,
  onToggleWishlist,
}: MenuSectionProps) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            isFavorite={favorites.includes(item.id)}
            isInWishlist={wishlist.includes(item.id)} // 
            onAddToCart={onAddToCart}
            onToggleFavorite={onToggleFavorite}
            onToggleWishlist={onToggleWishlist} // 
          />

        ))}
      </div>
    </section>
  );
}