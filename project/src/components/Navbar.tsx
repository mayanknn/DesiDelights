import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-orange-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">Desi Delight</Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="hover:bg-orange-500 px-3 py-2 rounded-md">Home</Link>
              <Link to="/about" className="hover:bg-orange-500 px-3 py-2 rounded-md">About Us</Link>
              <Link to="/menu" className="hover:bg-orange-500 px-3 py-2 rounded-md">Menu</Link>
              <Link to="/contact" className="hover:bg-orange-500 px-3 py-2 rounded-md">Contact</Link>
              <Link to="/reservation" className="hover:bg-orange-500 px-3 py-2 rounded-md">Book Table</Link>
              <Link to="/login" className="bg-orange-700 hover:bg-orange-800 px-4 py-2 rounded-md">Login</Link>
              <Link to="/signup" className="bg-orange-700 hover:bg-orange-800 px-4 py-2 rounded-md">Sign Up</Link>
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block hover:bg-orange-500 px-3 py-2 rounded-md">Home</Link>
            <Link to="/about" className="block hover:bg-orange-500 px-3 py-2 rounded-md">About Us</Link>
            <Link to="/menu" className="block hover:bg-orange-500 px-3 py-2 rounded-md">Menu</Link>
            <Link to="/contact" className="block hover:bg-orange-500 px-3 py-2 rounded-md">Contact</Link>
            <Link to="/reservation" className="block hover:bg-orange-500 px-3 py-2 rounded-md">Book Table</Link>
            <Link to="/login" className="block hover:bg-orange-500 px-3 py-2 rounded-md">Login</Link>
            <Link to="/signup" className="block hover:bg-orange-500 px-3 py-2 rounded-md">Sign Up</Link>
          </div>
        </div>
      )}
    </nav>
  );
}