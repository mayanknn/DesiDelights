import React, { useState, useEffect } from 'react';
import { Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function Orders() {
  const navigate = useNavigate();
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        // Get user data from localStorage
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (!userData || !userData.uid) {
          throw new Error('User not authenticated');
        }

        // Query orders where isDone is 'Completed' and uid matches current user
        const ordersRef = collection(db, 'orders');
        const q = query(
          ordersRef,
          where('isDone', '==', 'Completed'),
          where('uid', '==', userData.uid)
        );

        const querySnapshot = await getDocs(q);
        const ordersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          // Convert Firestore timestamp to JS Date if needed
          timestamp: doc.data().timestamp?.toDate().toISOString()
        }));

        setOrders(ordersData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, []);

  const toggleOrder = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
        <p className="mt-4 text-lg text-gray-700">Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Error</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => navigate('/')}
          className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700"
        >
          Back to Home
        </button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">No Order History</h2>
        <p className="text-gray-600 mb-4">You haven't completed any orders yet.</p>
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
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Order History</h2>

      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div
              className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleOrder(order.id)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Order #{order.orderId}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <p className="text-sm text-gray-600 flex items-center">
                      <Clock size={16} className="mr-1" />
                      {order.orderDate.toDate().toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </p>
                    <p className="text-sm text-gray-600">
                      {order.orderDate.toDate().toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-4">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Completed
                    </span>
                    <p className="mt-1 font-bold text-lg">₹{order.totalAmount}</p>
                  </div>
                  {expandedOrder === order.id ? (
                    <ChevronUp size={20} className="text-gray-400" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-400" />
                  )}
                </div>
              </div>
            </div>

            {expandedOrder === order.id && (
              <div className="p-4 border-t bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Order Items</h3>
                <div className="space-y-2">
                  {JSON.parse(order.orderDetails).map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.quantity}x {item.name}
                      </span>
                      <span className="font-medium">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}