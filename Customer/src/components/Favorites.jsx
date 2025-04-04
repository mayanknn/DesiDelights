import React, { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs,deleteDoc,doc } from 'firebase/firestore';
import { db } from '../firebase';

export default function Favorites({ title = "Favorites" }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (!userData || !userData.uid) {
          setFavorites([]);
          setLoading(false);
          return;
        }

        const q = query(
          collection(db, "favorites"),
          where("uid", "==", userData.uid)
        );

        const querySnapshot = await getDocs(q);
        const favoritesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setFavorites(favoritesData);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const removeFromFavorites = async (id) => {
    try {
      await deleteDoc(doc(db, "favorites", id));
      setFavorites(favorites.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  const filteredItems = favorites.filter(
    (item) =>
      searchQuery.trim() === '' ||
      (item.itemName && item.itemName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.categoryId && item.categoryId.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading your favorites...</p>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <Heart size={48} className="mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your {title} is empty</h2>
        <p className="text-gray-600 mb-6">Save your favorite items to order them again!</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="sticky top-16 bg-white z-40 py-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search saved items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-6">My {title}</h1>

      {filteredItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No items found matching your search</p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-4 text-orange-600 hover:text-orange-700"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={item.imageUrl}
                alt={item.itemName}
                className="w-1/4 h-auto max-w-[120px] md:max-w-[160px] object-cover rounded-lg"
              />
              <div className="flex-1 ml-4">
                <h3 className="font-semibold text-gray-800 text-sm">{item.itemName}</h3>
                <p className="text-xs text-gray-500">{item.grams}gm</p>
                <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                <p className="font-semibold text-gray-800 text-sm mt-2">₹{item.price}</p>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => removeFromFavorites(item.id)}
                  className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                  Remove
                </button>
                <button
                  onClick={() => addToCart(item, [])}
                  className="px-3 py-1 bg-orange-600 text-white text-xs rounded hover:bg-orange-700 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}