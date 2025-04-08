// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import TableWrapper from "./components/TableWrapper"; // <- New wrapper component

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <FavoritesProvider>
          <Router>
            <div className="min-h-screen bg-gray-100">
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<Navigate to="/default/menu" />} />

                  {/* Dynamic route for table */}
                  <Route path="/:tableId/*" element={<TableWrapper />} />

                  {/* Catch-all fallback */}
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
