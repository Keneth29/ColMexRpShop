import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Product } from '../../types';

export function ProductForm() {
  const { categories, subcategories, addProduct } = useShop();
  const [productData, setProductData] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    categoryId: '',
    imageUrl: '',
    description: ''
  });

  const selectedCategory = categories.find(cat => cat.id === productData.categoryId);
  const availableSubcategories = subcategories.filter(
    sub => sub.categoryId === productData.categoryId
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct(productData as Product);
    setProductData({
      name: '',
      price: 0,
      categoryId: '',
      imageUrl: '',
      description: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={productData.name}
            onChange={(e) => setProductData({ ...productData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Price</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={productData.price}
            onChange={(e) => setProductData({ ...productData, price: Number(e.target.value) })}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Category</label>
          <select
            className="w-full p-2 border rounded"
            value={productData.categoryId}
            onChange={(e) => setProductData({ ...productData, categoryId: e.target.value, subcategoryId: undefined })}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        {selectedCategory?.hasSubcategories && (
          <div>
            <label className="block text-gray-700 mb-2">Subcategory</label>
            <select
              className="w-full p-2 border rounded"
              value={productData.subcategoryId}
              onChange={(e) => setProductData({ ...productData, subcategoryId: e.target.value })}
              required
            >
              <option value="">Select Subcategory</option>
              {availableSubcategories.map((subcategory) => (
                <option key={subcategory.id} value={subcategory.id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Image URL</label>
        <input
          type="url"
          className="w-full p-2 border rounded"
          value={productData.imageUrl}
          onChange={(e) => setProductData({ ...productData, imageUrl: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Description</label>
        <textarea
          className="w-full p-2 border rounded"
          value={productData.description}
          onChange={(e) => setProductData({ ...productData, description: e.target.value })}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
      >
        Add Product
      </button>
    </form>
  );
}