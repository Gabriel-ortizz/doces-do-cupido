import React, { useState, useRef, useEffect } from "react";
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
const chocolateSelectableProducts: string[] = ["Trufas", "Mini Trufas", "Barras", "Coração"];
const specialProduct = "Cesta Personalizada";

const chocolates = ["Ao Leite", "Meio Amargo", "Branco", "Pistache"];

const productFillings: Record<string, string[]> = {

  "Ovo de Colher": ["Limão", "Brigadeiro", "Morango", "Beijinho", "Maracujá", "Paçoca"],
  "Ovo Gourmet": ["Ferrero-Rocher", "KitKat", "Oreo", "Ninho c/ Nutella", "Ninho c/ Morango"],
  "Trufas": ["Limão", "Brigadeiro", "Morango", "Beijinho", "Maracujá", "Paçoca"],
  "Mini Trufas": ["Limão", "Brigadeiro", "Morango", "Beijinho", "Maracujá", "Paçoca"],
  "Barras": ["Limão", "Brigadeiro", "Morango", "Beijinho", "Maracujá", "Paçoca"],
  "Coração": ["Limão", "Brigadeiro", "Morango", "Beijinho", "Maracujá", "Paçoca"],
  "Ovos Kids": ["Limão", "Brigadeiro", "Morango", "Beijinho", "Maracujá", "Paçoca"],
  "Ovos faça em casa": ["Limão", "Brigadeiro", "Morango", "Beijinho", "Maracujá", "Paçoca"],
  "Bolo de Pote": ["Ferrero-Rocher", "KitKat", "Oreo", "Ninho c/ Nutella", "Ninho c/ Morango", "Brigadeiro", "Beijinho"]

};

const chocolateExtraPrice: Record<string, { normal: number; custom: number }> = {
  "Ao Leite": { normal: 0, custom: 0 },
  "Meio Amargo": { normal: 3.5, custom: 4.5 },
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


const basketSizes: ProductOption[] = [
  { name: "Pequena", price: 20 },
  { name: "Média", price: 35 },
  { name: "Grande", price: 50 },
];

const basketItems: ProductOption[] = [
  { name: "Trufa", price: 5 },
  { name: "Mini Trufa", price: 3 },
  { name: "Ovo de Colher 100g", price: 25 },
  { name: "Ovo Gourmet 100g", price: 30 },
  { name: "Coração", price: 22 },
  { name: "Barra", price: 18 },
];

const ProductOptions: React.FC<ProductOptionsProps> = ({
  product,
  options,
  onAddToCart,
  setSelectedProduct,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [selectedFilling, setSelectedFilling] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<ProductOption | null>(null);
  const [selectedExtras, setSelectedExtras] = useState<ProductOption[]>([]);
  const [selectedChocolate, setSelectedChocolate] = useState<string>("Ao Leite");
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setSelectedProduct(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setSelectedProduct]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProduct(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setSelectedProduct]);

  const toggleExtra = (extra: ProductOption) => {
    setSelectedExtras((prev) =>
      prev.some((e) => e.name === extra.name)
        ? prev.filter((e) => e.name !== extra.name)
        : [...prev, extra]
    );
  };

  const calculateTotalPrice = () => {
    let basePrice = 0;
    if (product === specialProduct) {
      const sizePrice = selectedSize?.price || 0;
      const itemsPrice = selectedExtras.reduce((sum, item) => sum + item.price, 0);
      return (sizePrice + itemsPrice) * quantity;
    }

    if (product === "Bolo de Pote") {
      const fillingPrice = selectedFilling?.includes("Ferrero") || selectedFilling?.includes("KitKat") || selectedFilling?.includes("Oreo") || selectedFilling?.includes("Ninho")
        ? 10 : 8;
      basePrice = fillingPrice;
    } else {
      basePrice = customizableProducts.includes(product)
        ? selectedSize?.price || 0
        : options[0]?.price || 0;
    }

    const chocolatePrice = chocolateSelectableProducts.includes(product)
      ? chocolateExtraPrice[selectedChocolate]?.normal || 0
      : customizableProducts.includes(product)
        ? chocolateExtraPrice[selectedChocolate]?.custom || 0
        : 0;

    return (basePrice + chocolatePrice) * quantity;
  };

  return (
    <div className="fixed inset-0 flex justify-center bg-black bg-opacity-50 z-50">
      <div ref={modalRef} className="w-80 sm:w-96 bg-white max-h-screen shadow-xl p-6 relative transform transition-transform duration-300 ease-in-out overflow-y-auto rounded-2xl">
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >✖</button>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">{product}</h2>

        {product === specialProduct ? (
          <>
            <p className="font-semibold mb-2">Escolha o tamanho da cesta:</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {basketSizes.map((size) => (
                <Button
                key={size.name}
                onClick={() => setSelectedSize(size)}
                className={`border-2 rounded-lg px-4 py-2 font-semibold transition-all
                  ${selectedSize?.name === size.name
                    ? "border-pink-500 bg-pink-100 text-pink-700"
                    : "border-gray-300 bg-white text-gray-800 hover:border-pink-300"}`}
              >
                {size.name}
              </Button>
              
              ))}
            </div>

            <p className="font-semibold mb-2">Escolha os itens para a cesta:</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {basketItems.map((item) => (
               <Button
               key={item.name}
               onClick={() => toggleExtra(item)}
               className={`border-2 rounded-lg px-4 py-2 font-semibold transition-all
                 ${selectedExtras.some((e) => e.name === item.name)
                   ? "border-pink-500 bg-pink-100 text-pink-700"
                   : "border-gray-300 bg-white text-gray-800 hover:border-pink-300"}`}
             >
               {item.name}
             </Button>
             
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="font-semibold mb-2">Escolha os recheios:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2 mb-4 flex-wrap">
              {productFillings[product]?.map((filling) => (
                <Button
                  key={filling}
                  variant={selectedFilling === filling ? "default" : "outline"}
                  onClick={() => setSelectedFilling(filling)}
                  className={`border-2 rounded-lg px-4 py-2 font-semibold transition-all
                    ${selectedFilling === filling 
                      ? "border-pink-500 bg-pink-100 text-pink-700" 
                      : "border-gray-300 bg-white text-gray-800 hover:border-pink-300"}`}
                >
                  {filling}
                </Button>
              ))}
            </div>

            {(customizableProducts.includes(product) || chocolateSelectableProducts.includes(product)) && (
              <>
                <p className="font-semibold mb-2">Escolha o tipo de chocolate:</p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {chocolates.map((choc) => (
                    <Button
                    key={choc}
                    onClick={() => setSelectedChocolate(choc)}
                    className={`border-2 rounded-lg px-4 py-2 font-semibold transition-all
                      ${selectedChocolate === choc
                        ? "border-pink-500 bg-pink-100 text-pink-700"
                        : "border-gray-300 bg-white text-gray-800 hover:border-pink-300"}`}
                  >
                    {choc}
                  </Button>
                  
                  ))}
                </div>
              </>
            )}

            {customizableProducts.includes(product) && sizePrices[product] && (
              <>
                <p className="font-semibold mb-2">Escolha o tamanho:</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
                  {sizePrices[product].map((size) => (
                    <Button
                      key={size.name}
                      variant={selectedSize?.name === size.name ? "default" : "outline"}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size.name}
                    </Button>
                  ))}
                </div>
              </>
            )}
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
            const details = product === specialProduct
              ? `${selectedSize?.name} - ${selectedExtras.map(e => e.name).join(", ")}`
              : `${selectedFilling} - Chocolate: ${selectedChocolate}`;
            onAddToCart(product, details, unitPrice, quantity);
            setSelectedProduct(null);
          }}
          className="bg-pink-500 text-white font-bold hover:bg-pink-600 transition-all w-full"
          disabled={product === specialProduct ? !selectedSize || selectedExtras.length === 0 : !selectedFilling}
        >
          Adicionar ao Carrinho
        </Button>
      </div>
    </div>
  );
};

export default ProductOptions;
