"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import ProductOptions from "@/components/ProductOptions";
import MaintenancePage from "@/components/MaintenancePage";
import { useRouter } from "next/navigation";

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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();

  const isUnderMaintenance = false; // Defina como true para ativar a manutenção

  if (isUnderMaintenance) {
    return <MaintenancePage />;
  }

  const products: Product[] = [
    {
      name: "Trufas",
      image: "/img/Trufas.jpg",
      options: [
        { name: "Limão", price: 1.0 },
        { name: "Morango", price: 4.5 },
        { name: "Brigadeiro", price: 4.5 },
        { name: "Maracujá", price: 4.5 },
        { name: "Beijinho", price: 4.5 },
      ],
    },
    {
      name: "Barras",
      image: "/img/Barras.webp",
      options: [
        { name: "Limão", price: 18.0 },
        { name: "Morango", price: 18.0 },
        { name: "Brigadeiro", price: 18.0 },
        { name: "Maracujá", price: 18.0 },
        { name: "Beijinho", price: 18.0 },
      ],
    },
    {
      name: "Coração",
      image: "/img/coraçao_de_chocolate.jpg",
      options: [
        { name: "Limão", price: 6.5 },
        { name: "Morango", price: 6.5 },
        { name: "Brigadeiro", price: 6.5 },
        { name: "Maracujá", price: 6.5 },
        { name: "Beijinho", price: 6.5 },
      ],
    },
    {
      name: "Cones Recheado",
      image: "/img/cone.jpg",
      options: [
        { name: "Limão", price: 12.0 },
        { name: "Morango", price: 12.0 },
        { name: "Brigadeiro", price: 12.0 },
        { name: "Maracujá", price: 12.0 },
        { name: "Beijinho", price: 12.0 },
      ],
    },
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (productName: string, option: string, price: number, quantity: number) => {
    const selectedProduct = products.find((p) => p.name === productName);
    if (!selectedProduct) return;

    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find(
        (item) => item.name === productName && item.option === option
      );

      if (existingItem) {
        return prevCartItems.map((item) =>
          item.name === productName && item.option === option
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevCartItems, { name: productName, image: selectedProduct.image, quantity, option, price }];
    });
  };

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="bg-pink-50 min-h-screen text-center p-6">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={cartCount}
        setIsCartVisible={() => router.push("/cart")}
      />

      <main className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.name} product={product} onSelect={() => setSelectedProduct(product)} />
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
    </div>
  );
};

export default App;
