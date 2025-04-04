import React, { useState, useEffect } from 'react';
import { Heart, ShoppingCart, History, Award, Menu as MenuIcon, X, UtensilsCrossed, BookmarkPlus, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { auth } from '../firebase'; // Import Firebase auth
import { signOut } from 'firebase/auth';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { items } = useCart();
  const cartCount = items.length;
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userData"); // Remove user data from storage
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <nav className={`bg-orange-600 text-white transition-shadow ${isScrolled ? 'shadow-lg' : ''} sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-bold text-2xl flex items-center space-x-2">
            <UtensilsCrossed size={24} />
            <span>Desi Delight</span>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-orange-700"
          >
            {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`flex items-center space-x-1 hover:text-orange-200 transition-colors ${location.pathname === '/' ? 'text-orange-200' : ''}`}>
              <UtensilsCrossed size={20} />
              <span>Menu</span>
            </Link>
            
            <Link to="/favorites" className={`flex items-center space-x-1 hover:text-orange-200 transition-colors ${location.pathname === '/favorites' ? 'text-orange-200' : ''}`}>
              <Heart size={20} />
              <span>Favorites</span>
            </Link>

            <Link to="/wishlist" className={`flex items-center space-x-1 hover:text-orange-200 transition-colors ${location.pathname === '/wishlist' ? 'text-orange-200' : ''}`}>
              <BookmarkPlus size={20} />
              <span>Wishlist</span>
            </Link>
            
            <Link to="/orders" className={`flex items-center space-x-1 hover:text-orange-200 transition-colors ${location.pathname === '/orders' ? 'text-orange-200' : ''}`}>
              <History size={20} />
              <span>Orders</span>
            </Link>
            
            <Link to="/loyalty" className={`flex items-center space-x-1 hover:text-orange-200 transition-colors ${location.pathname === '/loyalty' ? 'text-orange-200' : ''}`}>
              <Award size={20} />
              <span>Points</span>
            </Link>
            
            <Link to="/cart" className={`flex items-center space-x-1 hover:text-orange-200 transition-colors relative ${location.pathname === '/cart' ? 'text-orange-200' : ''}`}>
              <ShoppingCart size={20} />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-orange-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Logout Button */}
            <button onClick={handleLogout} className="flex items-center space-x-1 hover:text-orange-200 transition-colors">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`${isOpen ? 'block' : 'hidden'} md:hidden pb-4`}>
          <div className="flex flex-col space-y-2">
            <Link to="/" className={`flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-orange-700 ${location.pathname === '/' ? 'bg-orange-700' : ''}`} onClick={() => setIsOpen(false)}>
              <UtensilsCrossed size={20} />
              <span>Menu</span>
            </Link>
            
            <Link to="/favorites" className={`flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-orange-700 ${location.pathname === '/favorites' ? 'bg-orange-700' : ''}`} onClick={() => setIsOpen(false)}>
              <Heart size={20} />
              <span>Favorites</span>
            </Link>

            <Link to="/wishlist" className={`flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-orange-700 ${location.pathname === '/wishlist' ? 'bg-orange-700' : ''}`} onClick={() => setIsOpen(false)}>
              <BookmarkPlus size={20} />
              <span>Wishlist</span>
            </Link>
            
            <Link to="/orders" className={`flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-orange-700 ${location.pathname === '/orders' ? 'bg-orange-700' : ''}`} onClick={() => setIsOpen(false)}>
              <History size={20} />
              <span>Orders</span>
            </Link>
            
            <Link to="/loyalty" className={`flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-orange-700 ${location.pathname === '/loyalty' ? 'bg-orange-700' : ''}`} onClick={() => setIsOpen(false)}>
              <Award size={20} />
              <span>Points</span>
            </Link>
            
            <Link to="/cart" className={`flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-orange-700 ${location.pathname === '/cart' ? 'bg-orange-700' : ''}`} onClick={() => setIsOpen(false)}>
              <ShoppingCart size={20} />
              <span>Cart ({cartCount})</span>
            </Link>

            {/* Logout Button for Mobile */}
            <button onClick={() => { handleLogout(); setIsOpen(false); }} className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-orange-700">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
