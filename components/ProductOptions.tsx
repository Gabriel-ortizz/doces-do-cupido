import React, { useState } from 'react';

type ProductOption = {
  name: string;
  price: number;
};

type ProductOptionsProps = {
  product: string;
  options: ProductOption[];
  onAddToCart: (product: string, option: string, price: number, quantity: number) => void;
  setSelectedProduct: (product: string | null) => void;
};

const ProductOptions: React.FC<ProductOptionsProps> = ({
  product,
  options,
  onAddToCart,
  setSelectedProduct,
}) => {
  const [selectedOption, setSelectedOption] = useState<ProductOption | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-11/12 max-w-md text-center relative">
       
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{product}</h2>
        <p className="text-gray-600 mb-2">Escolha uma opção:</p>

        
        <div className="flex flex-wrap justify-center gap-3 mb-4">
          {options.map((option, idx) => (
            <button
              key={idx}
              className={`px-4 py-2 rounded-lg border-2 transition-all ${
                selectedOption?.name === option.name
                  ? 'border-pink-500 bg-pink-100'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onClick={() => setSelectedOption(option)}
            >
              {option.name} - R$ {option.price.toFixed(2)}
            </button>
          ))}
        </div>

        
        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="bg-gray-200 px-3 py-1 rounded-lg text-lg hover:bg-gray-300"
          >
            -
          </button>
          <span className="text-lg font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="bg-gray-200 px-3 py-1 rounded-lg text-lg hover:bg-gray-300"
          >
            +
          </button>
        </div>

      
        <div className="flex justify-center mt-4">
          <button
            onClick={() => {
              if (selectedOption) {
                onAddToCart(product, selectedOption.name, selectedOption.price, quantity);
                setSelectedProduct(null);
              }
            }}
            className="bg-pink-500 text-white py-2 px-4 rounded-lg font-bold hover:bg-pink-600 transition-all"
            disabled={!selectedOption}
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductOptions;
