import React from 'react';
import { History } from 'lucide-react';

export const WasteLogDisplay = ({ wasteLogs }) => {
  const totalWaste = wasteLogs.reduce((acc, log) => acc + log.quantity, 0);
  const lastLog = wasteLogs[wasteLogs.length - 1];

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
            {new Date(lastLog.timestamp).toLocaleTimeString()}
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

export const WasteHistoryModal = ({ wasteLogs }) => {
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
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Time</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Dish</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Quantity</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Reason</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {wasteLogs.map((log) => (
              <tr key={log.id}>
                <td className="px-4 py-2 text-sm text-gray-900">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
                <td className="px-4 py-2 text-sm text-gray-900">{log.dishName}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{log.quantity}</td>
                <td className="px-4 py-2 text-sm text-gray-500">{log.reason || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </dialog>
  );
};