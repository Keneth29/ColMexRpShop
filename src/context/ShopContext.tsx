import React, { createContext, useContext } from 'react';
import { useProducts } from './hooks/useProducts';
import { useCategories } from './hooks/useCategories';
import { useAuth } from './hooks/useAuth';
import type { ShopContextType } from './types';

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const products = useProducts();
  const categories = useCategories();
  const auth = useAuth();

  const value: ShopContextType = {
    ...products,
    ...categories,
    ...auth
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}