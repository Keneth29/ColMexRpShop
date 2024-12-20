import React from 'react';
import { useShop } from '../../context/ShopContext';

interface ProductFiltersProps {
  selectedCategoryId: string | 'all';
  selectedSubcategoryId: string | 'all';
  onCategoryChange: (categoryId: string | 'all') => void;
  onSubcategoryChange: (subcategoryId: string | 'all') => void;
}

export function ProductFilters({
  selectedCategoryId,
  selectedSubcategoryId,
  onCategoryChange,
  onSubcategoryChange
}: ProductFiltersProps) {
  const { categories, subcategories } = useShop();
  
  const selectedCategory = categories.find(cat => cat.id === selectedCategoryId);
  const availableSubcategories = subcategories.filter(
    sub => sub.categoryId === selectedCategoryId
  );

  return (
    <div className="flex gap-4 mb-8">
      <select
        className="select-main p-1"
        value={selectedCategoryId}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="all">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      
      {selectedCategory?.hasSubcategories && (
        <select
          className="select-main p-1"
          value={selectedSubcategoryId}
          onChange={(e) => onSubcategoryChange(e.target.value)}
        >
          <option value="all">All Subcategories</option>
          {availableSubcategories.map((subcategory) => (
            <option key={subcategory.id} value={subcategory.id}>
              {subcategory.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}