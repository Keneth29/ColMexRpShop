import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export function SubcategoryManager() {
  const { categories, subcategories, addSubcategory, deleteSubcategory } = useShop();
  const [newSubcategory, setNewSubcategory] = useState({ name: '', categoryId: '' });

  const categoriesWithSub = categories.filter(cat => cat.hasSubcategories);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSubcategory.name.trim() && newSubcategory.categoryId) {
      addSubcategory(newSubcategory);
      setNewSubcategory({ name: '', categoryId: '' });
    }
  };

  return (
    <div className="bg-color rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Manage Subcategories</h2>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-4">
          <select
            className="p-2 border rounded"
            value={newSubcategory.categoryId}
            onChange={(e) => setNewSubcategory({ ...newSubcategory, categoryId: e.target.value })}
            required
          >
            <option value="">Select Category</option>
            {categoriesWithSub.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Subcategory Name"
            className="flex-1 p-2 border rounded"
            value={newSubcategory.name}
            onChange={(e) => setNewSubcategory({ ...newSubcategory, name: e.target.value })}
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Subcategory
          </button>
        </div>
      </form>

      <div className="space-y-2">
        {subcategories.map((subcategory) => {
          const parentCategory = categories.find(cat => cat.id === subcategory.categoryId);
          return (
            <div key={subcategory.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div>
                <span className="font-medium">{subcategory.name}</span>
                <span className="ml-2 text-sm text-gray-500">
                  ({parentCategory?.name})
                </span>
              </div>
              <button
                onClick={() => deleteSubcategory(subcategory.id)}
                className="p-1 text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}