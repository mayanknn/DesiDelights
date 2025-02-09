import React, { useState } from 'react';
import { Header } from './components/Header';
import { MenuSection } from './components/MenuSection';

import type { MenuItem, CartItem, User } from './types';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Home from './components/Home';
import './index.css'; // or wherever your global styles are
import { Sidebar } from "./components/Sidebar";
import Login from "./components/Login";





// Sample data - In a real app, this would come from an API
const MENU_ITEMS: MenuItem[] = [
  // Indian
  {
    id: '1',
    name: 'Butter Chicken',
    description: 'Tender chicken pieces in rich, creamy tomato sauce',
    price: 320,
    category: 'Indian',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=800',
    isAvailable: true,
    isRecommended: true,
    isChefSpecial: true,
    customizations: {
      spiceLevels: ['Mild', 'Medium', 'Spicy'],
      portions: ['Half', 'Full'],
      addOns: [
        { name: 'Extra Butter', price: 30 },
        { name: 'Extra Gravy', price: 40 }
      ]
    }
  },
  {
    id: '2',
    name: 'Dal Makhani',
    description: 'Creamy black lentils slow-cooked overnight',
    price: 220,
    category: 'Indian',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800',
    isAvailable: true,
    isRecommended: true,
    isChefSpecial: false,
    customizations: {
      spiceLevels: ['Mild', 'Medium', 'Spicy'],
      portions: ['Half', 'Full'],
      addOns: [
        { name: 'Extra Butter', price: 25 },
        { name: 'Extra Dal', price: 40 }
      ]
    }
  },
  // Chinese
  {
    id: '3',
    name: 'Kung Pao Chicken',
    description: 'Spicy diced chicken with peanuts and vegetables',
    price: 290,
    category: 'Chinese',
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&q=80&w=800',
    isAvailable: true,
    isRecommended: false,
    isChefSpecial: true,
    customizations: {
      spiceLevels: ['Mild', 'Medium', 'Spicy'],
      portions: ['Half', 'Full'],
      addOns: [
        { name: 'Extra Sauce', price: 25 },
        { name: 'Extra Peanuts', price: 20 }
      ]
    }
  },
  {
    id: '4',
    name: 'Dim Sum',
    description: 'Assorted steamed dumplings with various fillings',
    price: 250,
    category: 'Chinese',
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&q=80&w=800',
    isAvailable: true,
    isRecommended: true,
    isChefSpecial: false,
    customizations: {
      spiceLevels: [],
      portions: ['6 Pieces', '12 Pieces'],
      addOns: [
        { name: 'Extra Sauce', price: 20 },
        { name: 'Extra Chili Oil', price: 15 }
      ]
    }
  },
  // Punjabi
  {
    id: '5',
    name: 'Sarson Da Saag',
    description: 'Traditional Punjabi dish made with mustard greens, served with makki roti',
    price: 250,
    category: 'Punjabi',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800',
    isAvailable: true,
    isRecommended: true,
    isChefSpecial: true,
    customizations: {
      spiceLevels: [],
      portions: ['Half', 'Full'],
      addOns: [
        { name: 'Extra Makki Roti', price: 20 },
        { name: 'Extra Butter', price: 25 }
      ]
    }
  },
  // Italian
  {
    id: '6',
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella, and basil',
    price: 320,
    category: 'Italian',
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&q=80&w=800',
    isAvailable: true,
    isRecommended: true,
    isChefSpecial: false,
    customizations: {
      spiceLevels: [],
      portions: ['8 inch', '12 inch'],
      addOns: [
        { name: 'Extra Cheese', price: 50 },
        { name: 'Add Mushrooms', price: 40 }
      ]
    }
  },
  {
    id: '7',
    name: 'Pasta Alfredo',
    description: 'Creamy pasta with parmesan cheese sauce',
    price: 280,
    category: 'Italian',
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023402d?auto=format&fit=crop&q=80&w=800',
    isAvailable: true,
    isRecommended: false,
    isChefSpecial: true,
    customizations: {
      spiceLevels: [],
      portions: ['Regular', 'Large'],
      addOns: [
        { name: 'Add Chicken', price: 60 },
        { name: 'Extra Sauce', price: 40 }
      ]
    }
  },
  // Desserts
  {
    id: '8',
    name: 'Gulab Jamun',
    description: 'Deep-fried milk solids soaked in sugar syrup',
    price: 150,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800',
    isAvailable: true,
    isRecommended: true,
    isChefSpecial: false,
    customizations: {
      spiceLevels: [],
      portions: ['2 Pieces', '4 Pieces'],
      addOns: [
        { name: 'Extra Sugar Syrup', price: 20 },
        { name: 'Add Ice Cream', price: 40 }
      ]
    }
  },
  {
    id: '9',
    name: 'Tiramisu',
    description: 'Italian coffee-flavored dessert with mascarpone cheese',
    price: 220,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=800',
    isAvailable: true,
    isRecommended: true,
    isChefSpecial: true,
    customizations: {
      spiceLevels: [],
      portions: ['Single', 'Double'],
      addOns: [
        { name: 'Extra Coffee Dust', price: 15 },
        { name: 'Add Chocolate Sauce', price: 25 }
      ]
    }
  }
];

function App() {
  const [user, setUser] = useState<User>({
    id: '1',
    name: 'John Doe',
    phone: '+91 9876543210',
    loyaltyPoints: 150,
    favorites: ['1'],
    wishlist: []
  });


  const [cart, setCart] = useState<CartItem[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSidebarTab, setActiveSidebarTab] = useState<'cart' | 'favorites' | 'wishlist'>('cart');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleAddToCart = (item: MenuItem, quantity: number) => {
    setCart((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        // Make sure to create a new array and object (immutability)
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...item, quantity }];
    });
  };

  const handleUpdateCartQuantity = (itemId: string, quantity: number) => {
    setCart((prev) =>
      quantity === 0
        ? prev.filter((item) => item.id !== itemId)
        : prev.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        )
    );
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleToggleFavorite = (itemId: string) => {
    setUser((prev) => {
      const favorites = prev.favorites.includes(itemId)
        ? prev.favorites.filter((id) => id !== itemId)
        : [...prev.favorites, itemId];
      return { ...prev, favorites };
    });
  };

  const handleToggleWishlist = (itemId: string) => {
    setUser((prev) => {
      const wishlist = prev.wishlist.includes(itemId)
        ? prev.wishlist.filter((id) => id !== itemId)
        : [...prev.wishlist, itemId];
      return { ...prev, wishlist };
    });
  };

  const handleMoveToCart = (item: MenuItem) => {
    handleAddToCart(item, 1);
  };

  const handleMoveToWishlist = (item: MenuItem) => {
    handleToggleWishlist(item.id);
    if (cart.find((i) => i.id === item.id)) {
      handleRemoveFromCart(item.id);
    }
  };

  const favoriteItems = MENU_ITEMS.filter((item) =>
    user.favorites.includes(item.id)
  );

  const wishlistItems = MENU_ITEMS.filter((item) =>
    user.wishlist.includes(item.id)
  );

  // Get unique categories
  const categories = ['All', ...new Set(MENU_ITEMS.map(item => item.category))];

  // Filter items based on selected category
  const filteredItems = selectedCategory === 'All'
    ? MENU_ITEMS
    : MENU_ITEMS.filter(item => item.category === selectedCategory);

  return (
    <>
      
        <div className="min-h-screen bg-gray-50">
          <Header
            user={user}
            onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
            onCartClick={() => {
              setActiveSidebarTab('cart');
              setIsSidebarOpen(true);
            }}
            onFavoritesClick={() => {
              setActiveSidebarTab('favorites');
              setIsSidebarOpen(true);
            }}
            onWishlistClick={() => {
              setActiveSidebarTab('wishlist');
              setIsSidebarOpen(true);
            }}
            cartItemsCount={cart.length}
          />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>



          <main className="max-w-7xl mx-auto px-4 pt-20 pb-16">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Welcome{user ? `, ${user.name}` : ''}!</h1>
              <p className="text-gray-600">
                Discover authentic flavors at Desi Delights
              </p>
            </div>

            {/* Category Tabs */}
            <div className="mb-8 overflow-x-auto">
              <div className="flex gap-2 pb-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-full font-medium transition-colors ${selectedCategory === category
                      ? 'bg-orange-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <MenuSection
              title={selectedCategory}
              items={filteredItems}
              favorites={user.favorites}
              wishlist={user.wishlist}  // ✅ Ensure `wishlist` is passed
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
              onToggleWishlist={handleToggleWishlist}  // ✅ Ensure function is passed
            />



          </main>

          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            activeTab={activeSidebarTab}
            onTabChange={setActiveSidebarTab}
            cart={cart}
            favorites={favoriteItems}
            wishlist={wishlistItems}
            onRemoveFromCart={handleRemoveFromCart}
            onUpdateCartQuantity={handleUpdateCartQuantity}
            onMoveToCart={handleMoveToCart}
            onRemoveFromFavorites={(itemId) => handleToggleFavorite(itemId)}
            onRemoveFromWishlist={(itemId) => handleToggleWishlist(itemId)}
            onMoveToWishlist={handleMoveToWishlist}
          />

          

        </div>
      </>
  );
}

export default App;