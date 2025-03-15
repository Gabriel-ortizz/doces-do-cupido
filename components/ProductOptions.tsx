import React, { useState } from "react";
import { Button } from "@/components/ui/button";

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
  setSelectedProduct: React.Dispatch<React.SetStateAction<string | null>>;
};



const customizableProducts: string[] = ["Ovo de Colher", "Ovo Gourmet"];
const chocolates: string[] = ["Ao Leite", "Meio Amargo", "Branco", "Pistache"];

const productFillings: Record<string, string[]> = {
  "Ovo de Colher": ["Limão", "Brigadeiro", "Morango", "Beijinho","Maracujá","Paçoca"],
  "Ovo Gourmet": ["Ferrero-Rocher", "KitKat", "Oreo", "Ninho c/ Nutella","Ninho c/ Morango"],
  "Trufas": ["Limão", "Brigadeiro", "Morango", "Beijinho","Maracujá","Paçoca"],
  "Mini Trufas": ["Limão", "Brigadeiro", "Morango", "Beijinho","Maracujá","Paçoca"],
  "Barras": ["Limão", "Brigadeiro", "Morango", "Beijinho","Maracujá","Paçoca"],
  "Coração": ["Limão", "Brigadeiro", "Morango", "Beijinho","Maracujá","Paçoca"],
  "Ovos Kids": ["Limão", "Brigadeiro", "Morango", "Beijinho","Maracujá","Paçoca"],
  "Ovos faça em casa": ["Limão", "Brigadeiro", "Morango", "Beijinho","Maracujá","Paçoca"],
};

const chocolateExtraPrice: Record<string, { normal: number; custom: number }> = {
  "Ao Leite": { normal: 0, custom: 0 },
  "Meio Amargo": { normal: 3.5, custom:4.5  },
  "Branco": { normal: 3.5, custom: 5.5 },
  "Pistache": { normal: 7, custom: 8.5 },
};

const sizePrices: Record<string, ProductOption[]> = {
  "Ovo de Colher": [
    { name: "100g", price: 50 },
    { name: "250g", price: 80 },
    { name: "350g", price: 90 },
  ],
  "Ovo Gourmet": [
    { name: "100g", price: 85 },
    { name: "250g", price: 100 },
    { name: "350g", price: 120 },
  ],
};

const extras: ProductOption[] = [
  { name: "Nutella", price: 3.5 },
  { name: "Paçoca", price: 2.5 },
  { name: "Castanhas", price: 2.5 },
  { name: "M&M", price: 2.5 },
  { name: "Granulado", price: 2 },
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
  const [selectedFilling, setSelectedFilling] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<ProductOption | null>(null);
  const [selectedExtras, setSelectedExtras] = useState<ProductOption[]>([]);
  const [quantity, setQuantity] = useState<number>(1);

  const calculateTotalPrice = () => {
    const basePrice = customizableProducts.includes(product) ? selectedSize?.price || 0 : options[0]?.price || 0;
    const extrasPrice = selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
    const chocolatePrice = selectedChocolate
      ? customizableProducts.includes(product)
        ? chocolateExtraPrice[selectedChocolate].custom
        : chocolateExtraPrice[selectedChocolate].normal
      : 0;
  
    const total = (basePrice + extrasPrice + chocolatePrice) * quantity;
  
  
    return total;
  };
  
  
  const selectFilling = (filling: string) => {
    setSelectedFilling(filling);
  };



  const toggleExtra = (extra: ProductOption) => {
    setSelectedExtras((prev) =>
      prev.some((e) => e.name === extra.name)
        ? prev.filter((e) => e.name !== extra.name)
        : [...prev, extra]
    );
  };

<<<<<<< dev
=======
  const extras: ProductOption[] = [
    { name: "Nutella", price: 3.5 },
    { name: "Paçoca", price: 2.5 },
    { name: "Castanhas", price: 2.5 },
    { name: "M&M", price: 2.5 },
    { name: "Granulado", price: 2 },
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
    const [selectedFilling, setSelectedFilling] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<ProductOption | null>(null);
    const [selectedExtras, setSelectedExtras] = useState<ProductOption[]>([]);
    const [quantity, setQuantity] = useState<number>(1);

    const calculateTotalPrice = () => {
      const basePrice = customizableProducts.includes(product) ? selectedSize?.price || 0 : options[0]?.price || 0;
      const extrasPrice = selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
      const chocolatePrice = selectedChocolate
        ? customizableProducts.includes(product)
          ? chocolateExtraPrice[selectedChocolate].custom
          : chocolateExtraPrice[selectedChocolate].normal
        : 0;
    
      const total = (basePrice + extrasPrice + chocolatePrice) * quantity;
    
      if (product === "Ovos Kids") {
        return quantity === 3 ? 30 : quantity * 12.9;
      }
    
      return total;
    };
    
    
    const selectFilling = (filling: string) => {
      setSelectedFilling(filling);
    };



    const toggleExtra = (extra: ProductOption) => {
      setSelectedExtras((prev) =>
        prev.some((e) => e.name === extra.name)
          ? prev.filter((e) => e.name !== extra.name)
          : [...prev, extra]
      );
    };
>>>>>>> main


  return (
    <div className="fixed inset-0 flex justify-center bg-black bg-opacity-50 z-50">
    <div className="w-80 sm:w-96 bg-white max-h-screen shadow-xl p-6 relative transform transition-transform duration-300 ease-in-out overflow-y-auto rounded-2xl">

        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Fechar"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">{product}</h2>

        <p className="font-semibold mb-2">Escolha os recheios:</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2 mb-2 flex-wrap">
          {productFillings[product]?.map((filling) => (
            <Button
              key={filling}
              variant={selectedFilling === filling ? "default" : "outline"}
              onClick={() => selectFilling(filling)}
              className={`border-2 rounded-lg px-4 py-2 font-semibold transition-all
              ${selectedFilling === filling 
                ? "border-pink-500 bg-pink-100 text-pink-700" 
                : "border-gray-300 bg-white text-gray-800 hover:border-pink-300"}
              `}
            >
              {filling}
            </Button>
          ))}
        </div>

        <p className="font-semibold mb-2">Escolha o tipo de chocolate:</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2 mb-4">
          {chocolates.map((chocolate) => (
            <Button
              key={chocolate}
              variant={selectedChocolate === chocolate ? "default" : "outline"}
              onClick={() => setSelectedChocolate(chocolate)}
              className={`border-2 rounded-lg px-4 py-2 font-semibold transition-all
              ${
                selectedChocolate === chocolate
                  ? "border-pink-500 bg-pink-100 text-pink-700"
                  : "border-gray-300 bg-white text-gray-800 hover:border-pink-300"
              }`}
            >
              {chocolate}
            </Button>
          ))}
        </div>

        {customizableProducts.includes(product) && sizePrices[product] && (
          <>
            <p className="font-semibold mb-2">Escolha o tamanho:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
              {sizePrices[product].map((size) => (
                <Button
                  key={size.name}
                  variant={selectedSize?.name === size.name ? "default" : "outline"}
                  className={`border-2 rounded-lg px-4 py-2 font-semibold transition-all
                  ${
                    selectedSize === size
                      ? "border-pink-500 bg-pink-100 text-pink-700"
                      : "border-gray-300 bg-white text-gray-800 hover:border-pink-300"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size.name}
                </Button>
              ))}
            </div>
          </>
        )}

        {customizableProducts.includes(product) && (
          <>
            <p className="font-semibold mb-2">Escolha os adicionais:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
          {extras.map((extra) => (
            <Button
              key={extra.name}
              variant={selectedExtras.some((e) => e.name === extra.name) ? "default" : "outline"}
              onClick={() => toggleExtra(extra)}
              className={`border-2 rounded-lg px-4 py-2 font-semibold transition-all
              ${selectedExtras.some((e) => e.name === extra.name) 
                ? "border-pink-500 bg-pink-100 text-pink-700" 
                : "border-gray-300 bg-white text-gray-800 hover:border-pink-300"}`}
            >
              {extra.name}
            </Button>
          ))}
        </div>
          </>
        )}

        <div className="flex items-center justify-center mb-4">
          <Button variant="outline" onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}>-</Button>
          <span className="mx-4 text-lg">{quantity}</span>
          <Button variant="outline" onClick={() => setQuantity((prev) => prev + 1)}>+</Button>
        </div>

        <p className="font-semibold text-xl mb-4">Preço Total: R$ {calculateTotalPrice().toFixed(2)}</p>

        <Button
           onClick={() => {
            const totalPrice = calculateTotalPrice();
            const unitPrice = totalPrice / quantity;
        
            const details = `${selectedChocolate} - ${selectedFilling} - ${selectedExtras.map(e => e.name).join(", ") || "Sem adicionais"}`;
            
            onAddToCart(product, details, unitPrice, quantity);
            setSelectedProduct(null);
          }}
          className="bg-pink-500 text-white font-bold hover:bg-pink-600 transition-all w-full"
          disabled={!selectedChocolate || !selectedFilling}
        >
          Adicionar ao Carrinho
        </Button>
      </div>
    </div>
  );
};

export default ProductOptions;