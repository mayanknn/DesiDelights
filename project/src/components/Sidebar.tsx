import React from 'react';
import { X, Trash2, Heart, ShoppingBag, List } from 'lucide-react';
import type { CartItem, MenuItem } from '../types';

import { useNavigate } from 'react-router-dom';
import Login from './Login';
import Home from './Home';


interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: 'cart' | 'favorites' | 'wishlist';
  onTabChange: (tab: 'cart' | 'favorites' | 'wishlist') => void;
  cart: CartItem[];
  favorites: MenuItem[];
  wishlist: MenuItem[];
  onRemoveFromCart: (itemId: string) => void;
  onUpdateCartQuantity: (itemId: string, quantity: number) => void;
  onMoveToCart: (item: MenuItem) => void;
  onRemoveFromFavorites: (itemId: string) => void;
  onRemoveFromWishlist: (itemId: string) => void;
  onMoveToWishlist: (item: MenuItem) => void;
}

export function Sidebar({
  isOpen,
  onClose,
  activeTab,
  onTabChange,
  cart,
  favorites,
  wishlist,
  onRemoveFromCart,
  onUpdateCartQuantity,
  onMoveToCart,
  onRemoveFromFavorites,
  onRemoveFromWishlist,
  onMoveToWishlist,
}: SidebarProps) {
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const navigate = useNavigate(); // ✅ Initialize navigate function


  return (
    <>

      <div
        className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Your Items</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2">
              {[
                { label: 'Cart', icon: <ShoppingBag className="w-4 h-4" />, count: cart.length, tab: 'cart' },
                { label: 'Favorites', icon: <Heart className="w-4 h-4" />, count: favorites.length, tab: 'favorites' },
                { label: 'Wishlist', icon: <List className="w-4 h-4" />, count: wishlist.length, tab: 'wishlist' },
              ].map(({ label, icon, count, tab }) => (
                <button
                  key={tab}
                  onClick={() => onTabChange(tab as 'cart' | 'favorites' | 'wishlist')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full ${activeTab === tab ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {icon}
                  {label} ({count})
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === 'cart' && (
              <>
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-semibold">{item.name}</h3>
                          <span className="font-bold">₹{item.price * item.quantity}</span>
                        </div>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => onUpdateCartQuantity(item.id, Math.max(0, item.quantity - 1))}
                              className="p-1 rounded-full hover:bg-gray-200"
                            >
                              -
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateCartQuantity(item.id, item.quantity + 1)}
                              className="p-1 rounded-full hover:bg-gray-200"
                            >
                              +
                            </button>
                          </div>
                          <button onClick={() => onRemoveFromCart(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-full">
                            <Trash2 className="w-4 h-4" />
                          </button>
                          {/* <button onClick={() => onMoveToWishlist(item)} className="p-2 text-gray-600 hover:bg-gray-200 rounded-full">
                          <List className="w-4 h-4" />
                        </button> */}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-8">Your cart is empty</div>
                )}
              </>
            )}

            {activeTab === 'favorites' && (
              <>
                {favorites.length > 0 ? (
                  favorites.map((item) => (
                    <div key={item.id} className="flex gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-semibold">{item.name}</h3>
                          <span className="font-bold">₹{item.price}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => onMoveToCart(item)}
                            className="px-4 py-2 bg-orange-600 text-white rounded-full text-sm hover:bg-orange-700"
                          >
                            Add to Cart
                          </button>
                          <button onClick={() => onRemoveFromFavorites(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-full">
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => onMoveToWishlist(item)} className="p-2 text-gray-600 hover:bg-gray-200 rounded-full">
                            <List className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-8">No favorite items yet</div>
                )}
              </>
            )}

            {activeTab === 'wishlist' && (
              <>
                {wishlist.length > 0 ? (
                  wishlist.map((item) => (
                    <div key={item.id} className="flex gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-semibold">{item.name}</h3>
                          <span className="font-bold">₹{item.price}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => onMoveToCart(item)}
                            className="px-4 py-2 bg-orange-600 text-white rounded-full text-sm hover:bg-orange-700"
                          >
                            Add to Cart
                          </button>
                          <button onClick={() => onRemoveFromWishlist(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-full">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-8">Your wishlist is empty</div>
                )}
              </>
            )}
          </div>

          {activeTab === 'cart' && cart.length > 0 && (
            <div className="p-4 border-t">
              <div className="flex justify-between mb-4">
                <span className="font-semibold">Total</span>
                <span className="font-bold">₹{cartTotal}</span>
              </div>
              <button
                className="w-full py-3 bg-orange-600 text-white rounded-full font-semibold hover:bg-orange-700"
                onClick={() => navigate("/Login")}
              >
                Proceed to Checkout
              </button>

            </div>
          )}
        </div>
      </div>
    </>
  );
}
