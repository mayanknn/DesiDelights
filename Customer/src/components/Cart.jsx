import React from 'react';
import { Minus, Plus, X, Star, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, total } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-4">Add some delicious items to your cart!</p>
        <button
          onClick={() => navigate('/')}
          className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="flex flex-row">
                {/* Image Container */}
                <div className="relative w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] flex-shrink-0">
                  <img
                    src={item.imageUrl}
                    alt={item.itemame}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Content Container */}
                <div className="flex-1 p-3 sm:p-4">
                  <div className="flex flex-col h-full">
                    {/* Header with Remove Button */}
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{item.itemName}</h3>
                        <div className="flex items-center mt-1 space-x-2">
                          <div className="flex items-center px-1.5 py-0.5 bg-green-50 rounded text-xs font-medium text-green-700">
                            <Star size={12} className="mr-0.5" />
                            4.5
                          </div>
                          <div className="hidden sm:flex items-center text-xs text-gray-500">
                            <Clock size={12} className="mr-0.5" />
                            20-30 min
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <X size={18} className="text-gray-400 hover:text-red-500" />
                      </button>
                    </div>

                    {/* Quantity and Size */}
                    <div className="mt-1 text-xs text-gray-600">{item.quantity}g</div>
                    
                    {/* Toppings if any */}
                    {item.selectedToppings.length > 0 && (
                      <div className="mt-1 text-xs text-gray-600">
                        <span className="font-medium">Toppings: </span>
                        {item.selectedToppings.join(', ')}
                      </div>
                    )}

                    {/* Price and Quantity Controls */}
                    <div className="mt-auto pt-2 flex items-center justify-between">
                      <div className="flex items-center space-x-2 bg-gray-100 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 rounded-l-lg hover:bg-gray-200 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 rounded-r-lg hover:bg-gray-200 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <p className="font-semibold text-gray-800">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md lg:sticky lg:top-24">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2 mb-4">
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-sm text-gray-600">
                  <span className="truncate pr-2">{item.quantity}x {item.itemName}</span>
                  <span className="flex-shrink-0">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total Amount</span>
                <span>₹{total}</span>
              </div>
              <button
                onClick={() => navigate('/auth')}
                className="w-full mt-4 bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}