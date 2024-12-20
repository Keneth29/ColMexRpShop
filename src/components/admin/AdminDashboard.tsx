import React from 'react';
import { CategoryManager } from './CategoryManager';
import { SubcategoryManager } from './SubcategoryManager';
import { ProductForm } from '../products/ProductForm';

export function AdminDashboard() {
  return (
    <div className="space-y-8">
      <CategoryManager />
      <SubcategoryManager />
      <div className="bg-color rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Add New Product</h2>
        <ProductForm />
      </div>
    </div>
  );
}