import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from './ProductCard';
import { ProductFilters } from './ProductFilters';

export function ProductList() {
  const { products, categories, subcategories } = useShop();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | 'all'>('all');
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string | 'all'>('all');

  const filteredProducts = products.filter(product => {
    if (selectedCategoryId !== 'all' && product.categoryId !== selectedCategoryId) return false;
    if (selectedSubcategoryId !== 'all' && product.subcategoryId !== selectedSubcategoryId) return false;
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductFilters
        selectedCategoryId={selectedCategoryId}
        selectedSubcategoryId={selectedSubcategoryId}
        onCategoryChange={setSelectedCategoryId}
        onSubcategoryChange={setSelectedSubcategoryId}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const category = categories.find(cat => cat.id === product.categoryId);
          const subcategory = subcategories.find(sub => sub.id === product.subcategoryId);
          
          return (
            <ProductCard
              key={product.id}
              product={product}
              categoryName={category?.name || ''}
              subcategoryName={subcategory?.name}
            />
          );
        })}
      </div>
    </div>
  );
}