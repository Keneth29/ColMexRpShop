import { useState, useEffect } from 'react';
import { Product } from '../../types';
import { useLocalStorage } from './useLocalStorage';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const { getItem, setItem } = useLocalStorage();

  useEffect(() => {
    const savedProducts = getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  const addProduct = (product: Product) => {
    const newProducts = [...products, { ...product, id: Date.now().toString() }];
    setProducts(newProducts);
    setItem('products', JSON.stringify(newProducts));
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    const newProducts = products.map(product => 
      product.id === id ? { ...product, ...updatedFields } : product
    );
    setProducts(newProducts);
    setItem('products', JSON.stringify(newProducts));
  };

  const deleteProduct = (id: string) => {
    const newProducts = products.filter(product => product.id !== id);
    setProducts(newProducts);
    setItem('products', JSON.stringify(newProducts));
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct
  };
}