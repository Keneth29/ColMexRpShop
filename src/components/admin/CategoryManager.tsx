import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export function CategoryManager() {
  const { categories, addCategory, deleteCategory } = useShop();
  const [newCategory, setNewCategory] = useState({ name: '', hasSubcategories: false });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.name.trim()) {
      addCategory(newCategory);
      setNewCategory({ name: '', hasSubcategories: false });
    }
  };

  return (
    <div className="bg-color rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Manage Categories</h2>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Category Name"
            className="flex-1 p-2 border rounded"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            required
          />
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={newCategory.hasSubcategories}
              onChange={(e) => setNewCategory({ ...newCategory, hasSubcategories: e.target.checked })}
            />
            Has Subcategories
          </label>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Category
          </button>
        </div>
      </form>

      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div>
              <span className="font-medium">{category.name}</span>
              {category.hasSubcategories && (
                <span className="ml-2 text-sm text-gray-500">(Has Subcategories)</span>
              )}
            </div>
            <button
              onClick={() => deleteCategory(category.id)}
              className="p-1 text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}