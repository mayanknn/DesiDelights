import React, { useState } from 'react';

function CategoryForm() {
  const [category, setCategory] = useState({
    name: '',
    displayName: '',
    image: null
  });

  const [errors, setErrors] = useState({}); // Stores error messages

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setCategory({ ...category, [name]: files ? files[0] : value });

    // Clear error when user starts typing/selecting
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!category.name) newErrors.name = 'Category name is required.';
    if (!category.displayName) newErrors.displayName = 'Display name is required.';
    if (!category.image) newErrors.image = 'Please select a category image.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    console.log('Form Submitted:', category);
    alert('Category added successfully!');
  };

  return (
    <div className="p-10 min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="max-w-2xl w-full bg-white p-10 rounded-lg shadow-lg">
        
        {/* Heading */}
        <h2 className="text-3xl font-bold text-[#C2410C] text-center mb-6">Category Form</h2>

        {/* Category Name */}
        <div className="mb-6">
          <div className="flex items-center">
            <label className="text-gray-700 text-base font-bold w-1/3" htmlFor="name">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={category.name}
              onChange={handleChange}
              className="w-2/3 p-3 border rounded text-base"
              placeholder="Enter category name"
            />
          </div>
          {errors.name && <p className="text-[#C2410C] text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Online Display Name */}
        <div className="mb-6">
          <div className="flex items-center">
            <label className="text-gray-700 text-base font-bold w-1/3" htmlFor="displayName">
              Display Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              value={category.displayName}
              onChange={handleChange}
              className="w-2/3 p-3 border rounded text-base"
              placeholder="Enter display name"
            />
          </div>
          {errors.displayName && <p className="text-[#C2410C] text-sm mt-1">{errors.displayName}</p>}
        </div>

        {/* Category Image Upload */}
        <div className="mb-6">
          <div className="flex items-center">
            <label className="text-gray-700 text-base font-bold w-1/3" htmlFor="image">
              Category Image <span className="text-red-500">*</span>
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
              {category.image ? category.image.name : "Choose file"}
            </label>
          </div>
          {errors.image && <p className="text-[#C2410C] text-sm mt-1">{errors.image}</p>}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button className="bg-[#C2410C] text-white font-bold py-3 px-8 rounded hover:bg-blue-700 text-lg" type="submit">
            Add Category
          </button>
        </div>

      </form>
    </div>
  );
}

export default CategoryForm;
