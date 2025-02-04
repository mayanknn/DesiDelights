import React, { useState } from 'react';
import { menuItems } from '../data/menuItems';
import { Search, Filter } from 'lucide-react';

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showJainOnly, setShowJainOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  const categories = ['all', 'starters', 'main course', 'breads', 'rice', 'desserts'];
  
  const filteredItems = menuItems.filter(item => 
    (selectedCategory === 'all' || item.category === selectedCategory) &&
    (!showJainOnly || item.isJain) &&
    (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     item.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
    item.price >= priceRange.min &&
    item.price <= priceRange.max
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Our Menu</h1>
      
      {/* Search and Filters */}
      <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search dishes..."
              className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Price Range</label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="0"
                max="1000"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) || 0 })}
                className="w-24 p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
              <span>to</span>
              <input
                type="number"
                min="0"
                max="1000"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) || 0 })}
                className="w-24 p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>

          {/* Jain Filter */}
          <div className="flex items-center">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={showJainOnly}
                onChange={(e) => setShowJainOnly(e.target.checked)}
                className="form-checkbox h-5 w-5 text-orange-600 rounded focus:ring-orange-500"
              />
              <span className="ml-2">Jain Options Only</span>
            </label>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full capitalize transition-colors ${
                selectedCategory === category
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              {item.isJain && (
                <span className="absolute top-2 right-2 px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                  Jain
                </span>
              )}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <span className="text-orange-600 font-semibold">₹{item.price}</span>
              </div>
              <p className="text-gray-600 text-sm mb-3">{item.description}</p>
              <div className="flex flex-wrap gap-2">
                {item.ingredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No items found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}