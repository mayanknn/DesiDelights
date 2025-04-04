import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { db } from '../../../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';

export default function ManageItems() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [grams, setGrams] = useState("");
  const [isJain, setIsJain] = useState("");
  const [errors, setErrors] = useState({});
  const [imageURL, setImageURL] = useState("");
  const [image, setImage] = useState(null);

  // Generate random ID for new items
  const randomAlphaNumeric = (length) => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = length; i > 0; --i) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  };

  useEffect(() => {
    async function fetchCategories() {
      const categorySnapshot = await getDocs(collection(db, 'categories'));
      setCategories(categorySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchMenuItems() {
      const querySnapshot = await getDocs(collection(db, 'menuItems'));
      let fetchedItems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      if (selectedCategory) {
        fetchedItems = fetchedItems.filter(item => item.categoryId === selectedCategory);
      }
      if (searchQuery) {
        fetchedItems = fetchedItems.filter(item => item.itemName.toLowerCase().includes(searchQuery.toLowerCase()));
      }
      setItems(fetchedItems);
    }
    fetchMenuItems();
  }, [selectedCategory, searchQuery]);

  const validateForm = () => {
    let newErrors = {};
    if (!itemName) newErrors.itemName = "Item name is required.";
    if (!category) newErrors.category = "Please select a category.";
    if (!description) newErrors.description = "Description is required.";
    if (!price) newErrors.price = "Price is required.";
    if (!grams) newErrors.grams = "Grams field is required.";
    if (!isJain) newErrors.isJain = "Please select if Jain is available.";
    if (!imageURL) newErrors.image = "Please upload an item image.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchAuth = async () => {
    const response = await fetch("http://localhost:5000/auth"); // Replace with your backend URL
    return await response.json();
  };

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please select a file first!");
      return;
    }

    const authData = await fetchAuth();

    const formData = new FormData();
    formData.append("file", image);
    formData.append("fileName", image.name);
    formData.append("publicKey", "public_XIz+lkN8Ye0WpbUS6A2/n7TIK00=");
    formData.append("signature", authData.signature);
    formData.append("expire", authData.expire);
    formData.append("token", authData.token);
    formData.append("folder", "/uploads");

    try {
      const response = await fetch(
        "https://upload.imagekit.io/api/v1/files/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.url) {
        setImageURL(data.url);
      } else {
        console.error("Upload failed:", data);
        alert("Upload failed! Please try again.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image. Check the console for details.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newItemId = randomAlphaNumeric(10);
    const itemData = {
      id: newItemId,
      itemName,
      categoryId: category,
      description,
      price,
      grams,
      isJain: isJain === "Yes",
      imageUrl: imageURL,
    };

    try {
      await setDoc(doc(db, "menuItems", newItemId), itemData);
      alert("Item added successfully!");
      setIsFormOpen(false);
      setItemName("");
      setCategory("");
      setDescription("");
      setPrice("");
      setGrams("");
      setIsJain("");
      setImage(null);
      setImageURL("");
      setErrors({});
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item!");
    }
  };

  return (
    <div className={`p-6 ${isFormOpen ? '' : ''}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Menu Items</h1>
        <button onClick={() => setIsFormOpen(true)} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
          <Plus className="w-4 h-4" /> Add Item
        </button>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-200">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-[#C2410C]">Add Item</h2>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* Item Name */}
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-1">Item Name *</label>
                    <input
                      type="text"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-[#C2410C] focus:border-transparent"
                      placeholder="Enter item name"
                    />
                    {errors.itemName && <p className="text-red-500 text-xs mt-1">{errors.itemName}</p>}
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-1">Category *</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full p-2 border rounded bg-white focus:ring-2 focus:ring-[#C2410C] focus:border-transparent"
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.displayName || cat.name}</option>
                      ))}
                    </select>
                    {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-1">Description *</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-[#C2410C] focus:border-transparent"
                    placeholder="Enter item description"
                    rows="3"
                  />
                  {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Price */}
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-1">Price *</label>
                    <input
                      type="text"
                      value={price}
                      onChange={(e) => /^\d*\.?\d*$/.test(e.target.value) && setPrice(e.target.value)}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-[#C2410C] focus:border-transparent"
                      placeholder="Enter price"
                    />
                    {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                  </div>

                  {/* Grams */}
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-1">Grams *</label>
                    <input
                      type="text"
                      value={grams}
                      onChange={(e) => setGrams(e.target.value)}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-[#C2410C] focus:border-transparent"
                      placeholder="Enter weight in grams"
                    />
                    {errors.grams && <p className="text-red-500 text-xs mt-1">{errors.grams}</p>}
                  </div>
                </div>

                {/* Jain Availability */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-1">Jain Available *</label>
                  <select
                    value={isJain}
                    onChange={(e) => setIsJain(e.target.value)}
                    className="w-full p-2 border rounded bg-white focus:ring-2 focus:ring-[#C2410C] focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  {errors.isJain && <p className="text-red-500 text-xs mt-1">{errors.isJain}</p>}
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-1">Upload Image *</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full p-2 border rounded bg-white focus:ring-2 focus:ring-[#C2410C] focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={handleUpload}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
                  >
                    Upload Image
                  </button>
                  {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                </div>

                {/* Image Preview */}
                {imageURL && (
                  <div className="mt-4">
                    <p className="text-gray-700 text-sm font-bold mb-1">Image Preview:</p>
                    <img src={imageURL} alt="Uploaded" className="w-40 h-40 object-cover rounded-lg border" />
                  </div>
                )}

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#C2410C] text-white rounded-md hover:bg-[#9C3A0A]"
                  >
                    Add Item
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-4 mb-6 flex-wrap">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-md text-white ${selectedCategory === null ? 'bg-indigo-600' : 'bg-gray-400'} hover:bg-indigo-500`}
        >
          All
        </button>

        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(selectedCategory === category.displayName ? null : category.displayName)}
            className={`px-4 py-2 rounded-md text-white ${selectedCategory === category.displayName ? 'bg-indigo-600' : 'bg-gray-400'} hover:bg-indigo-500`}
          >
            {category.displayName || category.name}
          </button>
        ))}
      </div>


      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search items..."
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute right-3 top-3 text-gray-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {item.imageUrl && (
              <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover" />
            )}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{item.itemName}</h3>
                <span className="text-gray-600">₹{item.price}</span>
              </div>
              <p className="text-sm text-gray-500 mb-4">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{item.grams}g</span>
                {item.isJain && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Jain</span>}
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-md">
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteDoc(doc(db, 'menuItems', item.id))}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}