"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";

import Cart from "@/components/Cart";
import MaintenancePage from "@/components/MaintenancePage";
import ProductOptions from "@/components/ProductOptions";

type ProductOption = {
  name: string;
  price: number;
};

type Product = {
  name: string;
  image: string;
  options: ProductOption[];
};

type CartItem = {
  name: string;
  image: string;
  quantity: number;
  option: string;
  price: number;
};

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartVisible, setIsCartVisible] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isClient, setIsClient] = useState(false);

  const isUnderMaintenance = false; // Defina como true para ativar a manutenção

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  if (isUnderMaintenance) {
    return <MaintenancePage />;
  }

  const products: Product[] = [
    {
      name: "Trufas",
      image: "/img/Trufas.jpg",
      options: [
        
      ],
    },
    {
      name: "Mini Trufas",
      image: "/img/Trufas.jpg",
      options: [
        
      ],
    },
    {
      name: "Barras",
      image: "/img/Barras.webp",
      options: [
       
      ],
    },
    {
      name: "Coração",
      image: "/img/coraçao_de_chocolate.jpg",
      options: [
      
        
      ],
    },
    {
      name: "Ovo de Colher",
      image: "/img/ovo_de_colher.jpg",
      options: [
      
      ],
    },
    {
      name: "Ovo Gourmet",
      image: "/img/ovo_gourmet.jpg",
      options: [
        
        
       
      ],
    },
    {
      name: "Ovos Kids",
      image: "/img/mini_ovos.jpeg",
      options: [
     
      ],
    },
    {
      name: "Ovos faça em casa",
      image: "/img/ovos_montar.jpg",
      options: [
        
      ],
    },
   
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (
    productName: string,
    option: string,
    price: number,
    quantity: number
  ) => {
    const selectedProduct = products.find((p) => p.name === productName);
    if (!selectedProduct) return;

    setCartItems((prevCartItems) => [
      ...prevCartItems,
      { name: productName, image: selectedProduct.image, quantity, option, price },
    ]);
  };

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
      <div className="bg-pink-50 min-h-screen text-center p-6">
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          cartCount={cartCount}
          setIsCartVisible={setIsCartVisible}
        />

        <main className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.name}
              product={product}
              onSelect={() => setSelectedProduct(product)}
            />
          ))}
        </main>

        {selectedProduct && (
          <ProductOptions
            product={selectedProduct.name}
            options={selectedProduct.options}
            onAddToCart={handleAddToCart}
            setSelectedProduct={() => setSelectedProduct(null)}
          />
        )}

        {isCartVisible && (
          <Cart
            cartItems={cartItems}
            setCartItems={setCartItems}
            setIsCartVisible={setIsCartVisible}
          />
        )}
      </div>

  );
};

export default App;
