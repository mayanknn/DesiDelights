import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { db } from "../../../firebase";
import {
  collection,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "categories"), (snapshot) => {
      setCategories(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    });

    return () => unsubscribe();
  }, []);

  const randomAlphaNumeric = (length = 10) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const newCategory = {
      name: formData.get("name"),
      displayName: formData.get("displayName"),
      createdAt: new Date(),
    };

    try {
      if (editingCategory) {
        await updateDoc(doc(db, "categories", editingCategory.id), newCategory);
      } else {
        const categoryWithId = {
          id: randomAlphaNumeric(12),
          ...newCategory,
        };
        await setDoc(doc(db, "categories", categoryWithId.id), categoryWithId);
      }
    } catch (error) {
      console.error("Error saving category:", error);
    }

    setEditingCategory(null);
    setIsFormOpen(false);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "categories", id));
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Menu Categories</h1>
        <button
          onClick={() => {
            setEditingCategory(null);
            setIsFormOpen(true);
          }}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg h-auto min-h-[350px] relative">
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-2 right-2 p-2 text-gray-500 hover:bg-gray-200 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-semibold mb-6 text-center">
              {editingCategory ? "Edit Category" : "Add New Category"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name (for system)
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={editingCategory?.name}
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm p-3"
                  required
                />
              </div>
              <div>
                <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
                  Display Name
                </label>
                <input
                  type="text"
                  id="displayName"
                  name="displayName"
                  defaultValue={editingCategory?.displayName}
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm p-3"
                  required
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-5 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  {editingCategory ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-medium text-lg mb-2">{category.displayName}</h3>
            <p className="text-sm text-gray-500">{category.name}</p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => handleEdit(category)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-md"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(category.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-md"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
