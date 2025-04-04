import React from "react";
import { BrowserRouter as Router, Route,Routes,Navigate} from "react-router-dom";
import Navbar from './components/Navbar';
import Menu from './components/Menu';
import Auth from './components/Auth';
import Cart from './components/Cart';
import Wishlist from "./components/WishList";
import Orders from './components/Orders';
import Loyalty from './components/Loyalty';
import Favorites from './components/Favorites';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { FavoritesProvider } from './context/FavoritesContext';

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <FavoritesProvider> {/* Wrap the app with FavoritesProvider */}
          <Router>
            <div className="min-h-screen bg-gray-100">
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<Menu />} />
              
                  <Route path="/auth/" element={<Auth />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/loyalty" element={<Loyalty />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
            </div>
          </Router>
        </FavoritesProvider>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;