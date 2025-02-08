import React, { useState } from "react";

function ItemForm() {
  const [item, setItem] = useState({
    itemName: "",
    category: "",
    description: "",
    price: "",
    image: null,
  });

  const [errors, setErrors] = useState({}); // Stores error messages

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Ensure only numbers and "." are allowed in price field
    if (name === "price" && value !== "" && !/^\d*\.?\d*$/.test(value)) {
      return;
    }

    setItem({ ...item, [name]: files ? files[0] : value });

    // Clear error when user starts typing/selecting
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!item.itemName) newErrors.itemName = "Item name is required.";
    if (!item.category) newErrors.category = "Please select a category.";
    if (!item.description) newErrors.description = "Description is required.";
    if (!item.price) newErrors.price = "Price is required.";
    if (!item.image) newErrors.image = "Please select an item image.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log("Form Submitted:", item);
    alert("Item added successfully!");
  };

  return (
    <div className="p-10 min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl w-full bg-white p-10 rounded-lg shadow-lg"
      >
        {/* Heading */}
        <h2 className="text-3xl font-bold text-[#C2410C] text-center mb-6">
          Add Item
        </h2>

        {/* Item Name */}
        <div className="mb-6">
          <div className="flex items-center">
            <label className="text-gray-700 text-base font-bold w-1/3" htmlFor="itemName">
              Item Form <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              value={item.itemName}
              onChange={handleChange}
              className="w-2/3 p-3 border rounded text-base"
              placeholder="Enter item name"
            />
          </div>
          {errors.itemName && <p className="text-[#C2410C] text-sm mt-1">{errors.itemName}</p>}
        </div>

        {/* Category Dropdown */}
        <div className="mb-6">
          <div className="flex items-center">
            <label className="text-gray-700 text-base font-bold w-1/3" htmlFor="category">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={item.category}
              onChange={handleChange}
              className="w-2/3 p-3 border rounded text-base bg-white"
            >
              <option value="">Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home</option>
              <option value="books">Books</option>
            </select>
          </div>
          {errors.category && <p className="text-[#C2410C] text-sm mt-1">{errors.category}</p>}
        </div>

        {/* Item Description */}
        <div className="mb-6">
          <div className="flex items-center">
            <label className="text-gray-700 text-base font-bold w-1/3" htmlFor="description">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={item.description}
              onChange={handleChange}
              className="w-2/3 p-3 border rounded text-base"
              placeholder="Enter item description"
              rows="3"
            />
          </div>
          {errors.description && <p className="text-[#C2410C] text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Item Price */}
        <div className="mb-6">
          <div className="flex items-center">
            <label className="text-gray-700 text-base font-bold w-1/3" htmlFor="price">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={item.price}
              onChange={handleChange}
              className="w-2/3 p-3 border rounded text-base"
              placeholder="Enter price"
            />
          </div>
          {errors.price && <p className="text-[#C2410C] text-sm mt-1">{errors.price}</p>}
        </div>

        {/* Item Image Upload */}
        <div className="mb-6">
          <div className="flex items-center">
            <label className="text-gray-700 text-base font-bold w-1/3" htmlFor="image">
              Item Image <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleChange}
              className="hidden"
            />
            <label
              htmlFor="image"
              className="w-2/3 p-3 border rounded cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 text-base"
            >
              {item.image ? item.image.name : "Choose file"}
            </label>
          </div>
          {errors.image && <p className="text-[#C2410C] text-sm mt-1">{errors.image}</p>}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            className="bg-[#C2410C] text-white font-bold py-3 px-8 rounded hover:bg-blue-700 text-lg"
            type="submit"
          >
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
}

export default ItemForm;
