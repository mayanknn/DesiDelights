import React from 'react';
import { Clock, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

export const OrderCard = ({ order, onStatusChange }) => {
  // Parse orderDetails if it's a string, otherwise use as-is
  const orderDetails = typeof order.orderDetails === 'string' 
    ? JSON.parse(order.orderDetails) 
    : order.orderDetails || [];

  // Ensure order has all required properties with fallbacks
  const safeOrder = {
    ...order,
    tableNumber: order.tableNumber || 'Unknown',
    status: order.status || 'New',
    timestamp: order.timestamp || new Date().toISOString(),
    orderDetails: Array.isArray(orderDetails) ? orderDetails : [],
  };

  const statusColors = {
    New: 'bg-blue-100 text-blue-800',
    'In Progress': 'bg-yellow-100 text-yellow-800',
    Ready: 'bg-green-100 text-green-800',
    Delayed: 'bg-red-100 text-red-800',
    Completed: 'bg-green-100 text-green-800',
    Cancelled: 'bg-gray-100 text-gray-800',
  };

  const isActionable = !['Completed', 'Cancelled'].includes(safeOrder.status);

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 mb-4 ${!isActionable ? 'opacity-75' : ''}`}>
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <span className="text-lg font-semibold">Table {safeOrder.tableNumber}</span>
        </div>
        <div className="flex items-center text-gray-500">
          <Clock className="h-4 w-4 mr-1" />
          <span className="text-sm">
            {new Date(safeOrder.timestamp).toLocaleTimeString()}
          </span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {safeOrder.orderDetails.length > 0 ? (
          safeOrder.orderDetails.map((item, index) => (
            <div key={item.id || `${item.name}-${index}`} className="flex justify-between">
              <span>{item.name} × {item.quantity || 1}</span>
              
            </div>
          ))
        ) : (
          <div className="text-gray-400 italic">No items in this order</div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <span className={`px-3 py-1 rounded-full text-sm ${statusColors[safeOrder.status]}`}>
          {safeOrder.status}
        </span>
        
        {isActionable && (
          <div className="flex gap-2">
            <button
              onClick={() => onStatusChange(safeOrder.id, 'Completed')}
              className="p-2 rounded-full hover:bg-green-50 text-green-600 transition-colors"
              title="Mark as Completed"
            >
              <CheckCircle2 className="h-6 w-6" />
            </button>
            <button
              onClick={() => onStatusChange(safeOrder.id, 'Cancelled')}
              className="p-2 rounded-full hover:bg-red-50 text-red-600 transition-colors"
              title="Cancel Order"
            >
              <XCircle className="h-6 w-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}