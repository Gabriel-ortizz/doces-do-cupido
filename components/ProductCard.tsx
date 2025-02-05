// components/ProductCard.tsx
import React from 'react';

interface ProductOption {
  name: string;
  price: number;
}

interface Product {
  name: string;
  image: string;
  options: ProductOption[];
}

interface ProductCardProps {
  product: Product;
  onSelect: (name: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  return (
    <div className="border p-4 rounded-md shadow-md hover:shadow-lg transition-all">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="font-semibold text-lg">{product.name}</h3>
      <button
        onClick={() => onSelect(product.name)}
        className="mt-2 bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition-colors"
      >
        Ver Opções
      </button>
    </div>
  );
};

export default ProductCard;
