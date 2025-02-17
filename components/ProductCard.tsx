import Image from 'next/image';
import React from 'react';
import { Button } from '@/components/ui/button';

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
      <Image
        height={165}
        width={165}
        src={product.image}
        alt={`Imagem do produto ${product.name}`}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="font-semibold text-lg">{product.name}</h3>
      <div className="mt-2 flex flex-col gap-2">
        <Button
          onClick={() => onSelect(product.name)}
          className="bg-pink-500 text-white hover:bg-pink-600"
        >
          Ver Opções
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;