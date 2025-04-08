import React from 'react';

export const TableStats = ({ orders }) => {
  const activeOrders = orders.filter(order => !['Completed', 'Cancelled'].includes(order.status)).length;
  const priorityOrders = orders.filter(order => order.priority && !['Completed', 'Cancelled'].includes(order.status)).length;
  const delayedOrders = orders.filter(order => order.status === 'Delayed').length;
  const completedOrders = orders.filter(order => order.status === 'Completed').length;

  return (
    <div className="flex flex-wrap gap-4 text-sm">
      <div className="flex items-center">
        <span className="font-medium text-gray-500">Active Orders:</span>
        <span className="ml-2 font-bold text-blue-600">{activeOrders}</span>
      </div>
      <div className="flex items-center">
        <span className="font-medium text-gray-500">Priority:</span>
        <span className="ml-2 font-bold text-red-600">{priorityOrders}</span>
      </div>
      <div className="flex items-center">
        <span className="font-medium text-gray-500">Delayed:</span>
        <span className="ml-2 font-bold text-orange-600">{delayedOrders}</span>
      </div>
      <div className="flex items-center">
        <span className="font-medium text-gray-500">Completed:</span>
        <span className="ml-2 font-bold text-green-600">{completedOrders}</span>
      </div>
    </div>
  );
};