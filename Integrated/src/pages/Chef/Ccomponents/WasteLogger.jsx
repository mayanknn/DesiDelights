import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase'; // Assuming you have firebase.js setup

// Helper function to generate random alphanumeric ID
const generateRandomId = (length = 10) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const WasteLogger = ({ onLogWaste }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dishName, setDishName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [reason, setReason] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Generate random ID
    const wasteId = generateRandomId();
    const userData = localStorage.getItem('userData');
    const parsedUserData = JSON.parse(userData);
    const userId = parsedUserData?.userId || 'unknown'; // Fallback to 'unknown' if userId is not found
    
    // Create waste data object
    const wasteData = {
      id: wasteId,
      uid: userId,
      dishName,
      quantity,
      reason,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    try {
      // Add document to Firestore
      await setDoc(doc(db, 'wasteLogs', wasteId), wasteData);
      
      // Call the callback if provided
      if (onLogWaste) {
        onLogWaste(wasteData);
      }
      
      // Reset form and close modal
      setIsOpen(false);
      setDishName('');
      setQuantity(1);
      setReason('');
    } catch (error) {
      console.error('Error logging waste:', error);
      // You might want to add error handling here
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-red-500 hover:bg-red-600 text-white rounded-full p-4 shadow-lg flex items-center"
      >
        <Trash2 className="h-6 w-6" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop with blur effect */}
          <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm z-40"></div>
          
          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96">
              <h2 className="text-xl font-semibold mb-4">Log Food Waste</h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Dish Name
                    </label>
                    <input
                      type="text"
                      value={dishName}
                      onChange={(e) => setDishName(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Quantity
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Reason (Optional)
                    </label>
                    <textarea
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
                      rows={3}
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md"
                  >
                    Log Waste
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}