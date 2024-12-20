import { useState, useEffect } from 'react';
import { Category, Subcategory } from '../../types';
import { useLocalStorage } from './useLocalStorage';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const { getItem, setItem } = useLocalStorage();

  useEffect(() => {
    const savedCategories = getItem('categories');
    const savedSubcategories = getItem('subcategories');

    if (savedCategories) setCategories(JSON.parse(savedCategories));
    if (savedSubcategories) setSubcategories(JSON.parse(savedSubcategories));
  }, []);

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory = { ...category, id: Date.now().toString() };
    const newCategories = [...categories, newCategory];
    setCategories(newCategories);
    setItem('categories', JSON.stringify(newCategories));
  };

  const addSubcategory = (subcategory: Omit<Subcategory, 'id'>) => {
    const newSubcategory = { ...subcategory, id: Date.now().toString() };
    const newSubcategories = [...subcategories, newSubcategory];
    setSubcategories(newSubcategories);
    setItem('subcategories', JSON.stringify(newSubcategories));
  };

  const deleteCategory = (id: string) => {
    const newCategories = categories.filter(cat => cat.id !== id);
    const newSubcategories = subcategories.filter(sub => sub.categoryId !== id);
    
    setCategories(newCategories);
    setSubcategories(newSubcategories);
    
    setItem('categories', JSON.stringify(newCategories));
    setItem('subcategories', JSON.stringify(newSubcategories));
  };

  const deleteSubcategory = (id: string) => {
    const newSubcategories = subcategories.filter(sub => sub.id !== id);
    setSubcategories(newSubcategories);
    setItem('subcategories', JSON.stringify(newSubcategories));
  };

  return {
    categories,
    subcategories,
    addCategory,
    addSubcategory,
    deleteCategory,
    deleteSubcategory
  };
}