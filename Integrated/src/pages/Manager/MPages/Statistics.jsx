import React from 'react';
import { BarChart, DollarSign, Package, Trash } from 'lucide-react';

const mockStats = {
  totalOrders: 1250,
  revenue: 125000,
  averageOrderValue: 100,
  popularItems: [
    { name: 'Butter Chicken', quantity: 150, revenue: 67500 },
    { name: 'Paneer Tikka', quantity: 120, revenue: 30000 },
    { name: 'Naan', quantity: 200, revenue: 10000 },
  ]
};

export default function Statistics() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Restaurant Statistics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Package className="w-6 h-6 text-indigo-600" />
            </div>
            <span className="text-sm font-medium text-gray-500">Total Orders</span>
          </div>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-bold text-gray-900">{mockStats.totalOrders}</h3>
            <span className="text-sm text-green-600">+12.5%</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-gray-500">Total Revenue</span>
          </div>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-bold text-gray-900">₹{mockStats.revenue.toLocaleString()}</h3>
            <span className="text-sm text-green-600">+8.2%</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-500">Average Order Value</span>
          </div>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-bold text-gray-900">₹{mockStats.averageOrderValue}</h3>
            <span className="text-sm text-green-600">+5.3%</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <Trash className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-sm font-medium text-gray-500">Food Waste</span>
          </div>
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-bold text-gray-900">2.5%</h3>
            <span className="text-sm text-green-600">-1.2%</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Popular Items</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity Sold
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockStats.popularItems.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{item.revenue.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}