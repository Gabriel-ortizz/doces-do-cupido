'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import ProductOptions from '@/components/ProductOptions';
import Cart from '@/components/Cart';

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
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const products: Product[] = [
    {
      name: 'Trufa de Brigadeiro',
      image: '/img/Trufa De Brigadeiro.jpg',
      options: [
        { name: 'Ao Leite', price: 2.0 },
        { name: 'Branco', price: 2.5 },
        { name: 'Meio Amargo', price: 2.8 },
      ],
    },
    {
      name: 'Trufa de Limão',
      image: '/img/Trufa De Limão.jpg',
      options: [
        { name: 'Ao Leite', price: 2.0 },
        { name: 'Branco', price: 2.5 },
        { name: 'Meio Amargo', price: 2.8 },
      ],
    },
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (
    product: string,
    option: string,
    price: number,
    quantity: number
  ) => {
    const formattedProductName = product.replace(/\s+/g, '%20');
    setCartItems((prevCartItems) => [
      ...prevCartItems,
      {
        name: product,
        image: `/img/${formattedProductName}.jpg`,
        quantity,
        option,
        price,
      },
    ]);
  };

  const handleRemoveFromCart = (index: number) => {
    setCartItems((prevCartItems) => prevCartItems.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="bg-pink-50 min-h-screen text-center p-6">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-pink-200 shadow-md z-50">
        <Image src="/img/Logo.jpg" alt="Logo" width={64} height={64} />
        <input
          type="text"
          placeholder="Pesquise por produtos..."
          className="w-1/2 sm:w-3/4 p-3 border-2 border-gray-300 rounded-md text-gray-700"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div
          onClick={() => setIsCartVisible(!isCartVisible)}
          className="cursor-pointer p-3 rounded-lg hover:bg-pink-300 transition-all duration-200 flex items-center"
        >
          🛒 <span className="ml-1">{cartCount}</span>
        </div>
      </header>

      {/* Product Grid */}
      <main className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {filteredProducts.map((product, idx) => (
          <ProductCard
            key={idx}
            product={product}
            onSelect={(name) => setSelectedProduct(name)}
          />
        ))}
      </main>

      {/* Product Options */}
      {selectedProduct && (
        <ProductOptions
          product={selectedProduct}
          options={
            products.find((prod) => prod.name === selectedProduct)?.options || []
          }
          onAddToCart={handleAddToCart}
          setSelectedProduct={setSelectedProduct}
        />
      )}

      {/* Cart */}
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
