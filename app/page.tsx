"use client";
import { useCart } from '@/context/CartContext';

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import ProductOptions from "@/components/ProductOptions";
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

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCartItems(JSON.parse(storedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (
    productName: string,
    option: string,
    price: number,
    quantity: number
  ) => {
    const selectedProduct = products.find((p) => p.name === productName);
    if (!selectedProduct) return;

    const newItem: CartItem = {
      name: productName,
      image: selectedProduct.image,
      quantity,
      option,
      price,
    };

    setCartItems((prevCartItems) => [...prevCartItems, newItem]);
  };

  const handleGoToCart = () => {
    router.push("/cart");
  };

  const products: Product[] = [
    {
      name: "Trufas",
      image: "/img/Trufas.jpg",
      options: [
        { name: "Limão", price: 4.5 },
        { name: "Morango", price: 4.5 },
        { name: "Brigadeiro", price: 4.5 },
      ],
    },
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="bg-pink-50 min-h-screen text-center p-6">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={cartCount}
        onCartClick={handleGoToCart}
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
    </div>
  );
};

export default App;
