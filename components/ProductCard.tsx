import Image from 'next/image';
import React from 'react';

type Product = {
  name: string;
  image: string;
  options: { name: string; price: number }[];
};

type ProductCardProps = {
  product: Product;
  onSelect: (name: string) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all duration-200"
      onClick={() => onSelect(product.name)}
    >
      <Image width={10} height={10} src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <p className="text-lg font-semibold text-gray-700">{product.name}</p>
      </div>
    </div>
  );
};

export default ProductCard;
