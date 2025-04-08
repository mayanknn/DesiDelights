import React, { useState, useEffect } from 'react';
import { History, X } from 'lucide-react';
import { collection, query, orderBy, onSnapshot,where } from 'firebase/firestore';
import { db } from '../../../firebase'; // Make sure this path matches your firebase config file

export const WasteLogDisplay = ({ totalWaste, lastLog }) => {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm">
      <div className="flex items-center">
        <span className="font-medium text-gray-500">Total Waste:</span>
        <span className="ml-2 font-bold text-red-600">{totalWaste} items</span>
      </div>
      {lastLog && (
        <div className="flex items-center">
          <span className="font-medium text-gray-500">Last:</span>
          <span className="ml-2">{lastLog.dishName} ({lastLog.quantity})</span>
          <span className="ml-2 text-gray-400">
            {new Date(lastLog.createdAt).toLocaleTimeString()}
          </span>
        </div>
      )}
      <button
        onClick={() => document.getElementById('wasteHistoryModal')?.showModal()}
        className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 font-medium"
      >
        <History className="h-4 w-4" />
        History
      </button>
    </div>
  );
};

export const WasteHistoryModal = () => {
  const [wasteLogs, setWasteLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData?.uid) {
      setLoading(false);
      return;
    }
  
    // Temporary solution - use only the where clause
    const q = query(
      collection(db, 'wasteLogs'),
      where('uid', '==', userData.uid)
      // Remove orderBy until index is built
      // orderBy('createdAt', 'desc')
    );
  
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const logs = [];
      querySnapshot.forEach((doc) => {
        logs.push({ id: doc.id, ...doc.data() });
      });
      // Sort manually in memory
      logs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setWasteLogs(logs);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching waste logs:", error);
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, []);

  return (
    <dialog id="wasteHistoryModal" className="modal p-6 rounded-lg shadow-xl bg-white max-w-2xl w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Waste History</h2>
        <button
          onClick={() => document.getElementById('wasteHistoryModal')?.close()}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <p className="text-gray-500">Loading waste history...</p>
          </div>
        ) : wasteLogs.length === 0 ? (
          <div className="flex justify-center items-center h-32">
            <p className="text-gray-500">No waste logs found</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Time</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Dish</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Quantity</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Reason</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {wasteLogs.map((log) => (
                <tr key={log.id}>
                  <td className="px-4 py-2 text-sm text-gray-900">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900">{log.dishName}</td>
                  <td className="px-4 py-2 text-sm text-gray-900">{log.quantity}</td>
                  <td className="px-4 py-2 text-sm text-gray-500">{log.reason || '-'}</td>
                  <td className="px-4 py-2 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      log.status === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </dialog>
  );
};

export const WasteStats = () => {
  const [wasteLogs, setWasteLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'wasteLogs'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const logs = [];
      querySnapshot.forEach((doc) => {
        logs.push({ id: doc.id, ...doc.data() });
      });
      setWasteLogs(logs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const totalWaste = wasteLogs.reduce((acc, log) => acc + log.quantity, 0);
  const lastLog = wasteLogs[0];

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <WasteLogDisplay totalWaste={totalWaste} lastLog={lastLog} />
      <WasteHistoryModal />
    </div>
  );
};