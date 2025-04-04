import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

const AddTable = () => {
  const navigate = useNavigate();

  const handleAddTable = () => {
    // In a real application, this would make an API call to add a table
    // For now, we'll just navigate back to the dashboard
    navigate('/manager');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Table</h1>
      <div className="max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            <Plus className="w-12 h-12 text-indigo-600" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Add a New Table</h2>
          <p className="text-gray-600 mb-6">
            Click the button below to add a new table to your restaurant layout
          </p>
          <button
            onClick={handleAddTable}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Add Table
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTable;