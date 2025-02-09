import Image from 'next/image';
import React, { useState } from 'react';
import AdminDashboard from '@/components/admin/AdminDashboard';
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
  const [isAdminView, setIsAdminView] = useState(false);

  return (
    <div className="border p-4 rounded-md shadow-md hover:shadow-lg transition-all">
      {isAdminView ? (
        <div className="flex flex-col items-center">
          <h3 className="font-semibold text-lg">Editando: {product.name}</h3>
          <AdminDashboard />
          <Button onClick={() => setIsAdminView(false)} className="mt-2 bg-blue-500 hover:bg-blue-600">
            Voltar ao Produto
          </Button>
        </div>
      ) : (
        <>
          <Image height={165} width={165} src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <div className="mt-2 flex flex-col gap-2">
            <Button onClick={() => onSelect(product.name)} className="bg-pink-500 text-white hover:bg-pink-600">
              Ver Opções
            </Button>
           
          </div>
        </>
      )}
    </div>
  );
};

export default ProductCard;
