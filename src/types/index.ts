export interface Category {
  id: string;
  name: string;
  hasSubcategories: boolean;
}

export interface Subcategory {
  id: string;
  name: string;
  categoryId: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  categoryId: string;
  subcategoryId?: string;
  imageUrl: string;
  description: string;
}