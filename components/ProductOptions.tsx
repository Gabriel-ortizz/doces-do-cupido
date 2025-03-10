import React, { useState } from 'react'; 
import { Button } from '@/components/ui/button';

type ProductOption = {
  name: string;
  price: number;
};

type ProductOptionsProps = {
  product: string;
  options: ProductOption[];
  onAddToCart: (
    product: string,
    details: string,
    price: number,
    quantity: number
  ) => void;
  setSelectedProduct: (product: string | null) => void;
};

const customizableProducts = ["Ovo de Colher", "Trufa Recheada", "Chocolate Personalizado"];
const chocolates = ["Ao Leite", "Meio Amargo", "Branco", "Pistache"];
const fillings = ["Nutella", "Brigadeiro", "Doce de Leite", "Beijinho"];

const sizePrices: Record<string, ProductOption[]> = {
  "Ovo de Colher": [
    { name: "100g", price: 10 },
    { name: "250g", price: 20 },
    { name: "500g", price: 35 },
  ],
  "Trufa Recheada": [
    { name: "100g", price: 5 },
    { name: "250g", price: 12 },
    { name: "500g", price: 20 },
  ],
  "Chocolate Personalizado": [
    { name: "100g", price: 8 },
    { name: "250g", price: 15 },
    { name: "500g", price: 25 },
  ],
};

const extras: ProductOption[] = [
  { name: "Nutella", price: 2 },
  { name: "Paçoca", price: 1.5 },
  { name: "Castanhas", price: 2.5 },
  { name: "Disquete", price: 3 },
  { name: "Granulado", price: 3 },
  { name: "Uva Verde", price: 3 }, 
  { name: "Morango", price: 3 },
];

const ProductOptions: React.FC<ProductOptionsProps> = ({
  product,
  options,
  onAddToCart,
  setSelectedProduct,
}) => {
  const [selectedChocolate, setSelectedChocolate] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<ProductOption | null>(null);
  const [selectedFillings, setSelectedFillings] = useState<string | null>(null);
  const [selectedExtras, setSelectedExtras] = useState<ProductOption[]>([]);
  const [quantity, setQuantity] = useState<number>(1);

  const toggleExtra = (extra: ProductOption) => {
    setSelectedExtras((prev) =>
      prev.some((e) => e.name === extra.name)
        ? prev.filter((e) => e.name !== extra.name)
        : [...prev, extra]
    );
  };

  const calculateTotalPrice = () => {
    let sizePrice = selectedSize ? selectedSize.price : 0;
    let extrasPrice = selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
    return (sizePrice + extrasPrice) * quantity;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg text-center relative">
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Fechar"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">{product}</h2>

        {customizableProducts.includes(product) && (
          <>
           <p className="font-semibold mb-2">Escolha o recheio:</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {fillings.map((filling) => (
                <Button
                  key={filling}
                  variant={selectedFillings === filling ? "default" : "outline"}
                  onClick={() => setSelectedFillings(filling)}
                >
                  {filling}
                </Button>
              ))}
            </div>
            <p className="font-semibold mb-2">Escolha o tipo de chocolate:</p>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {chocolates.map((chocolate) => (
                <Button
                  key={chocolate}
                  variant={selectedChocolate === chocolate ? "default" : "outline"}
                  onClick={() => setSelectedChocolate(chocolate)}
                >
                  {chocolate}
                </Button>
              ))}
            </div>

           

            <p className="font-semibold mb-2">Escolha o tamanho:</p>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {sizePrices[product]?.map((size) => (
                <Button
                  key={size.name}
                  variant={selectedSize?.name === size.name ? "default" : "outline"}
                  onClick={() => setSelectedSize(size)}
                >
                  {size.name} - R$ {size.price.toFixed(2)}
                </Button>
              ))}
            </div>

            <p className="font-semibold mb-2">Adicionais:</p>
            <div className="flex gap-2 overflow-x-auto mb-4">
              {extras.map((extra) => (
                <Button
                  key={extra.name}
                  variant={selectedExtras.some((e) => e.name === extra.name) ? "default" : "outline"}
                  onClick={() => toggleExtra(extra)}
                >
                  {extra.name} (+ R$ {extra.price.toFixed(2)})
                </Button>
              ))}
            </div>
          </>
        )}

        <p className="text-lg font-semibold mb-4">Resumo do Pedido:</p>
        <p className="text-gray-700">
          <strong>Chocolate:</strong> {selectedChocolate || "Não selecionado"} <br />
          <strong>Recheio:</strong> {selectedFillings || "Não selecionado"} <br />
          <strong>Tamanho:</strong> {selectedSize ? selectedSize.name : "Não selecionado"} <br />
          <strong>Adicionais:</strong> {selectedExtras.length > 0 ? selectedExtras.map(e => e.name).join(", ") : "Nenhum"}
        </p>

        <p className="text-lg font-semibold mb-4">Total: R$ {calculateTotalPrice().toFixed(2)}</p>

        <Button
          onClick={() => {
            if (selectedChocolate && selectedFillings && selectedSize) {
              const details = `${selectedChocolate} - ${selectedFillings} - ${selectedSize.name} - ${selectedExtras.map(e => e.name).join(", ") || "Sem adicionais"}`;
              onAddToCart(product, details, calculateTotalPrice(), quantity);
              setSelectedProduct(null);
            }
          }}
          className="bg-pink-500 text-white font-bold hover:bg-pink-600 transition-all w-full"
          disabled={!selectedChocolate || !selectedFillings || !selectedSize}
        >
          Adicionar ao Carrinho
        </Button>
      </div>
    </div>
  );
};

export default ProductOptions;
