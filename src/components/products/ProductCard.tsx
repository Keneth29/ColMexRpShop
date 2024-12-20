import React, { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Product } from '../../types';
import { useShop } from '../../context/ShopContext';
import { ProductEditModal } from './ProductEditModal';
import { ExternalLink } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  categoryName: string;
  subcategoryName?: string;
}

export function ProductCard({ product, categoryName, subcategoryName }: ProductCardProps) {
  const discordUrl = "https://discord.com/channels/1244700844625231964/1269788981604651210";
  const { isAdmin, deleteProduct } = useShop();
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          {isAdmin && (
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={() => setShowEditModal(true)}
                className="p-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                onClick={() => deleteProduct(product.id)}
                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
        <div className="bg-color p-4">
          <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
          <p className="text-gray-600 mb-2">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-primary">
              ${product.price.toLocaleString()}
            </span>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm">
                {categoryName}
              </span>
              {subcategoryName && (
                <span className="px-2 py-1 bg-primary-light/10 text-primary-dark rounded-full text-sm">
                  {subcategoryName}
                </span>
              )}
            </div>
          </div>
          <a
          href={discordUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
        >
          Buy Now <ExternalLink className="h-4 w-4" />
        </a>
        </div>
      </div>

      <ProductEditModal
        product={product}
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        categoryName={categoryName}
        subcategoryName={subcategoryName}
      />
    </>
  );
}



