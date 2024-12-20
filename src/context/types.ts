import { Product, Category, Subcategory } from '../types';

export interface ShopContextType {
  products: Product[];
  categories: Category[];
  subcategories: Subcategory[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  addSubcategory: (subcategory: Omit<Subcategory, 'id'>) => void;
  deleteCategory: (id: string) => void;
  deleteSubcategory: (id: string) => void;
  isAdmin: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}