import React, { useState } from "react";
import { Heart, Plus, Minus, Bookmark } from "lucide-react";
import type { MenuItem as MenuItemType } from "../types";

interface MenuItemProps {
  item: MenuItemType;
  onAddToCart: (item: MenuItemType, quantity: number) => void;
  onToggleFavorite: (itemId: string) => void;
  onToggleWishlist: (itemId: string) => void;
  isFavorite: boolean;
  isInWishlist: boolean;
}

export function MenuItem({
  item,
  onAddToCart,
  onToggleFavorite,
  onToggleWishlist,
  isFavorite,
  isInWishlist,
}: MenuItemProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        
        <div className="absolute top-2 right-2 flex gap-2">
          {/* Wishlist Icon */}
          <button 
            className="p-2 bg-white rounded-full shadow-md transition-colors"
            onClick={() => onToggleWishlist(item.id)}
          >
            <Bookmark 
              className={`w-5 h-5 ${isInWishlist ? "text-green-500" : "text-gray-500"}`} 
            />
          </button>

          {/* Favorite Icon */}
          <button
            onClick={() => onToggleFavorite(item.id)}
            className="p-2 bg-white rounded-full shadow-md transition-colors"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"}`} />
          </button>
        </div>

        {!item.isAvailable && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold px-4 py-2 bg-red-500 rounded">
              Sold Out
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <span className="font-bold text-orange-600">₹{item.price}</span>
        </div>

        <p className="text-gray-600 text-sm mb-4">{item.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={() => onAddToCart(item, quantity)}
            disabled={!item.isAvailable}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              item.isAvailable
                ? "bg-orange-600 text-white hover:bg-orange-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Add to Cart
          </button>
        </div>

        {(item.isRecommended || item.isChefSpecial) && (
          <div className="mt-3 flex gap-2">
            {item.isRecommended && (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                Recommended
              </span>
            )}
            {item.isChefSpecial && (
              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                Chef's Special
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
