import React, { useState, useEffect } from 'react';
import { ChefHat, Menu } from 'lucide-react';
import { OrderCard } from './OrderCard';
import { WasteLogger } from './WasteLogger';
import { WasteLogDisplay, WasteHistoryModal } from './WasteLogDisplay';
import { TableStats } from './TableStats';
import { db } from '../../../firebase'; // Adjust path as needed
import { collection, getDocs, onSnapshot, doc, updateDoc } from 'firebase/firestore';

const ChefPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wasteLogs, setWasteLogs] = useState([]);
  const [viewMode, setViewMode] = useState('table');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  // Fetch orders from Firestore
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersCollection = collection(db, 'orders');
        
        // Set up real-time listener
        const unsubscribe = onSnapshot(ordersCollection, (snapshot) => {
          const ordersData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            // Convert Firestore timestamp to JS Date if needed
            timestamp: doc.data().timestamp?.toDate().toISOString()
          }));
          setOrders(ordersData);
          setLoading(false);
        });

        return () => unsubscribe();
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { isDone: 'Completed' });
      
      // Local state update is handled by the real-time listener
    } catch (err) {
      console.error("Error updating order status:", err);
      alert("Failed to update order status");
    }
  };

  const handleWasteLog = async (waste) => {
    try {
      const newWasteLog = {
        ...waste,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
      };
      
      // Optionally save to Firestore
      // await addDoc(collection(db, 'wasteLogs'), newWasteLog);
      
      setWasteLogs([...wasteLogs, newWasteLog]);
    } catch (err) {
      console.error("Error logging waste:", err);
    }
  };

  // Filter orders based on isDone status and other filters
  const filteredOrders = orders.map(order => ({
    ...order,
    items: order.items || [], // Ensure items always exists as an array
    timestamp: order.timestamp || new Date().toISOString(), // Ensure timestamp exists
    isDone: order.isDone || 'Pending' // Default to Pending if isDone doesn't exist
  })).filter(order => {
    // If showCompleted is false, only show Pending orders
    if (!showCompleted && order.isDone === 'Completed') {
      return false;
    }
    if (selectedCategory === 'All') return true;
    return order.items.some(item => item.category === selectedCategory);
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center text-red-500">
          <p className="text-lg font-medium">Error loading orders</p>
          <p className="mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ChefHat className="h-8 w-8 text-red-500 mr-3" />
                <h1 className="text-2xl font-bold text-gray-900">
                  Desi Delight - Chef Panel
                </h1>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden rounded-md p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>

            <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:block mt-4`}>
              <div className="space-y-4 lg:space-y-2">
                <div className="py-2 border-b border-gray-200">
                  <TableStats orders={orders} />
                </div>

                <div className="py-2 border-b border-gray-200">
                  <WasteLogDisplay wasteLogs={wasteLogs} />
                </div>

                <div className="py-2 flex flex-wrap gap-4 items-center">
                  <select
                    value={viewMode}
                    onChange={(e) => setViewMode(e.target.value)}
                    className="rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
                  >
                    <option value="table">Table View</option>
                    <option value="category">Category View</option>
                  </select>
                  {viewMode === 'category' && (
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
                    >
                      <option value="All">All Categories</option>
                      <option value="Starters">Starters</option>
                      <option value="Main Course">Main Course</option>
                      <option value="Beverages">Beverages</option>
                      <option value="Desserts">Desserts</option>
                    </select>
                  )}
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={showCompleted}
                      onChange={(e) => setShowCompleted(e.target.checked)}
                      className="rounded border-gray-300 text-red-600 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
                    />
                    <span className="ml-2 text-sm text-gray-600">Show Completed Orders</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">
              {showCompleted ? 'No orders found' : 'No pending orders'}
            </p>
            {!showCompleted && (
              <button
                onClick={() => setShowCompleted(true)}
                className="mt-2 text-red-500 hover:underline"
              >
                Show completed orders
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onStatusChange={handleStatusChange}
                showCompleteButton={order.isDone === 'pending'}
              />
            ))}
          </div>
        )}
      </main>

      <WasteLogger onLogWaste={handleWasteLog} />
      <WasteHistoryModal wasteLogs={wasteLogs} />
    </div>
  );
};

export default ChefPage;