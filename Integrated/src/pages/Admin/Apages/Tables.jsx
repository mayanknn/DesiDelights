import React, { useState } from 'react';

const Tables = () => {
  const [tables, setTables] = useState([
    { id: 1, capacity: 4, isOccupied: false },
    { id: 2, capacity: 2, isOccupied: true },
    { id: 3, capacity: 6, isOccupied: false },
    // Add more tables as needed
  ]);

  const handleTableStatus = (tableId) => {
    setTables(tables.map(table => 
      table.id === tableId 
        ? { ...table, isOccupied: !table.isOccupied }
        : table
    ));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Table Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tables.map((table) => (
          <div
            key={table.id}
            className={`p-6 rounded-lg shadow-md ${
              table.isOccupied ? 'bg-red-50' : 'bg-green-50'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">Table {table.id}</h3>
                <p className="text-sm text-gray-600">
                  Capacity: {table.capacity} persons
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  table.isOccupied
                    ? 'bg-red-100 text-red-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {table.isOccupied ? 'Occupied' : 'Available'}
              </span>
            </div>
            
            {table.isOccupied && table.currentOrder && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700">
                  Current Order:
                </p>
                <p className="text-sm text-gray-600">
                  Order #{table.currentOrder.id}
                </p>
                <p className="text-sm text-gray-600">
                  Customer: {table.currentOrder.customerName}
                </p>
              </div>
            )}
            
            <button
              onClick={() => handleTableStatus(table.id)}
              className={`w-full py-2 rounded-md text-sm font-medium ${
                table.isOccupied
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {table.isOccupied ? 'Mark as Available' : 'Mark as Occupied'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tables;