"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import ProductOptions from "@/components/ProductOptions";
import Cart from "@/components/Cart";
import MaintenancePage from "@/components/MaintenancePage";

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
        { name: "Limão", price: 4.5 },
        { name: "Morango", price: 4.5 },
        { name: "Brigadeiro", price: 4.5 },
        { name: "Maracujá", price: 4.5 },
        { name: "Beijinho", price: 4.5 },
        { name: "Amendoim", price: 4.5 },
      ],
    },
    {
      name: "Mini Trufas",
      image: "/img/Trufas.jpg",
      options: [
        { name: "Limão", price: 2.5 },
        { name: "Morango", price: 2.5 },
        { name: "Brigadeiro", price: 2.5 },
        { name: "Maracujá", price: 2.5 },
        { name: "Beijinho", price: 2.5 },
        { name: "Amendoim", price: 2.5 },
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
        { name: "Amendoim", price: 18.0 },
      ],
    },
    {
      name: "Coração",
      image: "/img/coraçao_de_chocolate.jpg",
      options: [
        { name: "Limão", price: 6.50 },
        { name: "Morango", price: 6.50 },
        { name: "Brigadeiro", price: 6.50 },
        { name: "Maracujá", price: 6.50 },
        { name: "Beijinho", price: 6.50 },
        { name: "Amendoim", price: 6.50 },
        
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
        { name: "Amendoim", price: 12.0 },
      ],
    },
    {
      name: "Ovo Trufado",
      image: "/img/ovo_trufado.jpg",
      options: [
        { name: "Limão 350g", price: 85.0 },
        { name: "Morango 350g", price: 85.0 },
        { name: "Brigadeiro 350g", price: 85.0 },
        { name: "Maracujá 350g", price: 85.0 },
        { name: "Beijinho 350g", price: 85.0 },
        { name: "Amendoim 350g", price: 85.0 },
        { name: "Limão 250g", price: 75.0 },
        { name: "Morango 250g", price: 75.0 },
        { name: "Brigadeiro 250g", price: 75.0 },
        { name: "Maracujá 250g", price: 75.0 },
        { name: "Beijinho 250g", price: 75.0 },
        { name: "Amendoim 250g", price: 75.0 },
      ],
    },
    {
      name: "Ovo de Colher",
      image: "/img/ovo_de_colher.jpg",
      options: [
       
        { name: "KitKat 350g", price: 100.0 },
        { name: "Brigadeiro com Morango 350g", price: 100.0 },
        { name: "Ninho com Nutella 350g", price: 100.0 },
        { name: "Ninho com Morango 350g", price: 100.0 },
        
        { name: "KitKat 250g", price: 90.0 },
        { name: "Brigadeiro com Morango 250g", price: 90.0 },
        { name: "Ninho com Nutella 250g", price: 90.0 },
        { name: "Ninho com Morango 250g", price: 90.0 },
      ],
    },
    {
      name: "Ovo Gourmet",
      image: "/img/ovo_gourmet.jpg",
      options: [
        { name: "Ferrero-Rocher 350g", price: 120.0 },
        { name: "KitKat 350g", price: 120.0 },
        { name: "Brigadeiro com Morango 350g", price: 120.0 },
        { name: "Ninho com Nutella 350g", price: 120.0 },
        { name: "Ninho com Morango 350g", price: 120.0 },
        { name: "Ferrero-Rocher 250g", price: 100.0 },
        { name: "KitKat 250g", price: 100.0 },
        { name: "Brigadeiro com Morango 250g", price: 100.0 },
        { name: "Ninho com Nutella 250g", price: 100.0 },
        { name: "Ninho com Morango 250g", price: 100.0 },
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