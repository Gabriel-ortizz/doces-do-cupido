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
      className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md hover:scale-105 transition-all duration-200"
      onClick={() => onSelect(product.name)}
    >
      <Image
        width={192}
        height={192}
        src={product.image}
        alt={`Imagem de ${product.name}`}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <p className="text-lg font-semibold text-gray-700">{product.name}</p>
      </div>
    </div>
  );
};

export default ProductCard;
