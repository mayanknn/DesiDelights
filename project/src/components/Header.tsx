import React, { useState } from 'react';
import { Menu, ShoppingCart, Heart, List, Star, User, Clock } from 'lucide-react';

interface HeaderProps {
  user?: {
    name: string;
    loyaltyPoints: number;
  };
  cartItemsCount: number;
  wishlistCount: number;
  favoritesCount: number;
  onMenuClick: () => void;
  onCartClick: () => void;
  onFavoritesClick: () => void;
  onWishlistClick: () => void;
  onHistoryClick: () => void;
}

export function Header({
  user,
  cartItemsCount,
  wishlistCount,
  favoritesCount,
  onMenuClick,
  onCartClick,
  onFavoritesClick,
  onWishlistClick,
  onHistoryClick,
}: HeaderProps) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');

  const handleLogin = () => {
    console.log('Logging in with:', { username, phoneNumber, otp });
    setShowLoginModal(false);
  };
  const [isHeartToggled, setIsHeartToggled] = useState(false);
  const handleItemAddedToFavorites = () => {
    setIsHeartToggled(!isHeartToggled); // Toggle the heart fill and border
    setFavoritesCount(isHeartToggled ? favoritesCount - 1 : favoritesCount + 1); // Update count
  };
  

  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <button onClick={onMenuClick} className="p-2 hover:bg-gray-100 rounded-full">
          <Menu className="w-6 h-6 text-white hover:text-black" />
        </button>

        <div className="flex-1 text-center">
          <h1 className="text-2xl font-bold text-white">Desi Delights</h1>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-medium text-white">{user.loyaltyPoints} pts</span>
            </div>
          )}

          {/* Wishlist Icon */}
          <button onClick={onWishlistClick} className="p-2 hover:bg-gray-100 rounded-full relative">
            <List className="w-6 h-6 text-white hover:text-black" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Favorites Icon */}
          <button
            onClick={onFavoritesClick}
            className="p-2 hover:bg-gray-100 rounded-full relative"
          >
            <Heart
              className={`w-6 h-6 ${isHeartToggled ? 'fill-red-500 border-2 border-black' : 'fill-red-600'} text-red-500`}
            />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>


          {/* Cart Icon */}
          <button onClick={onCartClick} className="p-2 hover:bg-gray-100 rounded-full relative">
            <ShoppingCart className="w-6 h-6 text-white hover:text-black" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </button>

          {/* User Icon - Open Login Modal */}
          <button onClick={() => setShowLoginModal(true)} className="p-2 hover:bg-gray-100 rounded-full">
            <User className="w-6 h-6 text-white hover:text-black" />
          </button>

          {/* History Icon */}
          <button onClick={onHistoryClick} className="p-2 hover:bg-gray-100 rounded-full">
            <Clock className="w-6 h-6 text-white hover:text-black" />
          </button>
        </div>
      </div>
    </header>
  );
}
