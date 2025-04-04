import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { menuItems as initialMenuItems } from '../Adata/dummyData';

const Menu1 = () => {
  const [items, setItems] = useState(initialMenuItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Starters', 'Main Course', 'Breads', 'Desserts', 'Beverages'];

  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddItem = (newItem) => {
    if (editingItem) {
      setItems(items.map(item => item.id === editingItem.id ? newItem : item));
      toast.success('Menu item updated successfully');
    } else {
      setItems([...items, newItem]);
      toast.success('Menu item added successfully');
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
    toast.success('Menu item deleted successfully');
  };

  const toggleAvailability = (id) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newStatus = !item.isAvailable;
        toast.success(`${item.name} is now ${newStatus ? 'available' : 'out of stock'}`);
        return { ...item, isAvailable: newStatus };
      }
      return item;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold">Menu Management</h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-orange-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Item
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category.toLowerCase())}
            className={`px-4 py-2 rounded-lg ${
              selectedCategory === category.toLowerCase()
                ? 'bg-orange-600 text-white'
                : 'bg-white text-gray-700 hover:bg-orange-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            onEdit={() => handleEditItem(item)}
            onDelete={() => handleDeleteItem(item.id)}
            onToggleAvailability={() => toggleAvailability(item.id)}
          />
        ))}
      </div>

      {isModalOpen && (
        <MenuItemModal
          onClose={() => {
            setIsModalOpen(false);
            setEditingItem(null);
          }}
          onSave={handleAddItem}
          editingItem={editingItem}
        />
      )}
    </div>
  );
};

const MenuItemCard = ({ item, onEdit, onDelete, onToggleAvailability }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-gray-600 text-sm mt-1 line-clamp-2">{item.description}</p>
          </div>
          <p className="text-lg font-bold">₹{item.price.toFixed(2)}</p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                filled={i < item.ratings}
              />
            ))}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={onEdit}
              className="text-gray-600 hover:text-orange-600 p-2 rounded-full hover:bg-orange-50 transition-colors"
              title="Edit Item"
            >
              <Edit2 className="w-5 h-5" />
            </button>
            <button
              onClick={onDelete}
              className="text-gray-600 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors"
              title="Delete Item"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={onToggleAvailability}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              item.isAvailable
                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                : 'bg-red-100 text-red-800 hover:bg-red-200'
            }`}
          >
            {item.isAvailable ? 'Available' : 'Out of Stock'}
          </button>
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {item.category}
          </span>
        </div>
      </div>
    </div>
  );
};

const Star = ({ filled }) => (
  <svg
    className={`w-4 h-4 ${
      filled ? 'text-yellow-400' : 'text-gray-300'
    }`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const MenuItemModal = ({ onClose, onSave, editingItem }) => {
  const [formData, setFormData] = useState(
    editingItem || {
      id: '',
      name: '',
      description: '',
      price: '',
      category: '',
      image: '',
      ratings: 0,
      isAvailable: true,
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: editingItem?.id || Date.now().toString(),
      price: parseFloat(formData.price),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">
            {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
          </h2>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                required
              >
                <option value="">Select category</option>
                <option value="starters">Starters</option>
                <option value="main">Main Course</option>
                <option value="breads">Breads</option>
                <option value="desserts">Desserts</option>
                <option value="beverages">Beverages</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rating
            </label>
            <div className="flex items-center mt-1">
              {[...Array(5)].map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setFormData({ ...formData, ratings: index + 1 })}
                  className="focus:outline-none"
                >
                  <Star filled={index < formData.ratings} />
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.isAvailable}
              onChange={(e) =>
                setFormData({ ...formData, isAvailable: e.target.checked })
              }
              className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
              id="availability"
            />
            <label htmlFor="availability" className="ml-2 text-sm text-gray-700">
              Item is available
            </label>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
            >
              {editingItem ? 'Update Item' : 'Add Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Menu1;