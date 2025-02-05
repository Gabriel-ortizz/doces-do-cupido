import Image from 'next/image';
import React, { useState } from 'react';

type Option = {
  name: string;
  price: number;
};

type ProductOptionsProps = {
  product: string;
  options: Option[];
  onAddToCart: (product: string, option: string, price: number, quantity: number) => void;
  setSelectedProduct: React.Dispatch<React.SetStateAction<string | null>>;
};

const ProductOptions: React.FC<ProductOptionsProps> = ({ product, options, onAddToCart, setSelectedProduct }) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [selectedOptionPrice, setSelectedOptionPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    if (selectedOption) {
      onAddToCart(product, selectedOption, selectedOptionPrice, quantity);
      setSelectedProduct(null);
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-lg w-80 sm:w-96 rounded-lg">
      <h2 className="text-xl mb-4 text-gray-800">Escolha uma opção para {product}</h2>
      <div className="flex items-center mb-4">
        <Image
          width={64}
          height={64}
          src={`/img/${product}.jpg`}
          alt={`Imagem do produto ${product}`}
          className="w-16 h-16 object-cover rounded-md mr-4"
        />
        <span className="text-lg text-gray-700">{product}</span>
      </div>

      <div className="mb-4">
        <select
          value={selectedOption}
          onChange={(e) => {
            setSelectedOption(e.target.value);
            const selected = options.find(option => option.name === e.target.value);
            if (selected) {
              setSelectedOptionPrice(selected.price);
            }
          }}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
        >
          <option value="">Selecione uma opção</option>
          {options.map((option, idx) => (
            <option key={idx} value={option.name}>
              {option.name} - R${option.price.toFixed(2)}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-between mb-4">
        <label className="text-lg text-gray-700">Quantidade:</label>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
            className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"
          >
            -
          </button>
          <span className="text-lg">{quantity}</span>
          <button
            onClick={() => setQuantity(prev => prev + 1)}
            className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setSelectedProduct(null)}
          className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition"
        >
          Cancelar
        </button>
        <button
          onClick={handleAddToCart}
          disabled={!selectedOption}
          className={`p-3 rounded-lg text-white transition ${
            selectedOption ? 'bg-pink-500 hover:bg-pink-600' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Adicionar
        </button>
      </div>
    </div>
  );
};

export default ProductOptions;
