import React, { useState } from 'react';
import { Product } from '../../types';
import { useShop } from '../../context/ShopContext';
import { Modal } from '../ui/Modal';

interface ProductEditModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  categoryName: string;
  subcategoryName?: string;
}

export function ProductEditModal({
  product,
  isOpen,
  onClose,
  categoryName,
  subcategoryName
}: ProductEditModalProps) {
  const { categories, subcategories, updateProduct } = useShop();
  const [formData, setFormData] = useState({ ...product });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProduct(product.id, formData);
    onClose();
  };

  const selectedCategory = categories.find(cat => cat.id === formData.categoryId);
  const availableSubcategories = subcategories.filter(
    sub => sub.categoryId === formData.categoryId
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Product">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded focus:ring-primary focus:border-primary"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Price</label>
          <input
            type="number"
            className="w-full p-2 border rounded focus:ring-primary focus:border-primary"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Category</label>
          <select
            className="w-full p-2 border rounded focus:ring-primary focus:border-primary"
            value={formData.categoryId}
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value, subcategoryId: undefined })}
            required
          >
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
              className="w-full p-2 border rounded focus:ring-primary focus:border-primary"
              value={formData.subcategoryId}
              onChange={(e) => setFormData({ ...formData, subcategoryId: e.target.value })}
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
        <div>
          <label className="block text-gray-700 mb-2">Image URL</label>
          <input
            type="url"
            className="w-full p-2 border rounded focus:ring-primary focus:border-primary"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            className="w-full p-2 border rounded focus:ring-primary focus:border-primary"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-primary text-white py-2 rounded hover:bg-primary-dark transition-colors"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}