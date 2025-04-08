// components/TableWrapper.jsx
import React, { useEffect } from 'react';
import { useParams, Routes, Route } from 'react-router-dom';
import Menu from './Menu';
import Auth from './Auth';
import Cart from './Cart';
import Wishlist from './WishList';
import Orders from './Orders';
import Loyalty from './Loyalty';
import Favorites from './Favorites';

const TableWrapper = () => {
  const { tableId } = useParams();

  useEffect(() => {
    if (tableId) {
      localStorage.setItem('tableId', tableId);
    }
  }, [tableId]);

  return (
    <Routes>
      <Route path="menu" element={<Menu />} />
      <Route path="auth" element={<Auth />} />
      <Route path="cart" element={<Cart />} />
      <Route path="wishlist" element={<Wishlist />} />
      <Route path="favorites" element={<Favorites />} />
      <Route path="orders" element={<Orders />} />
      <Route path="loyalty" element={<Loyalty />} />
      <Route path="*" element={<Menu />} /> {/* Default fallback inside table route */}
    </Routes>
  );
};

export default TableWrapper;
