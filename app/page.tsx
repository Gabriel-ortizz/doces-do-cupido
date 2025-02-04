'use client';
import React, { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import ProductOptions from '@/components/ProductOptions';
import Cart from '@/components/Cart';

type Product = {
  name: string;
  image: string;
  options: { name: string; price: number }[];
};

const App: React.FC = () => {
  const [cartCount, setCartCount] = useState<number>(0);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCartVisible, setIsCartVisible] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const products: Product[] = [
    { 
      name: "Trufa de Brigadeiro", 
      image: "/img/Trufa De Brigadeiro.jpg",  
      options: [
        { name: "Ao Leite", price: 2.00 },
        { name: "Branco", price: 2.50 },
        { name: "Meio Amargo", price: 2.80 }
      ] 
    },
    { 
      name: "Trufa de Limão", 
      image: "/img/Trufa De Limão.jpg",  
      options: [
        { name: "Ao Leite", price: 2.00 },
        { name: "Branco", price: 2.50 },
        { name: "Meio Amargo", price: 2.80 }
      ] 
    },
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (product: string, option: string, price: number, quantity: number) => {
    setCartItems([...cartItems, { name: product, image: `/img/${product}.jpg`, quantity, option, price }]);
    setCartCount(cartCount + quantity);
  };

  const handleRemoveFromCart = (index: number) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    setCartCount(cartItems.reduce((count, item) => count + item.quantity, 0));
  };

  
  const clearCart = () => {
    setCartItems([]); 
    setCartCount(0);   
  };

  return (
    <div className="bg-pink-50 min-h-screen text-center p-6">
      <header className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-pink-200 shadow-md z-50">
        <img src="/img/Logo.jpg" alt="Logo" className="w-16" />
        <input
          type="text"
          placeholder="Pesquise por produtos..."
          className="w-1/2 sm:w-3/4 p-3 border-2 border-gray-300 rounded-md text-gray-700"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div onClick={() => setIsCartVisible(!isCartVisible)} className="cursor-pointer p-3 rounded-lg hover:bg-pink-300 transition-all duration-200 flex items-center">
          🛒 <span className="ml-1">{cartCount}</span>
        </div>
      </header>

      <main className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {filteredProducts.map((product, idx) => (
          <ProductCard 
            key={idx} 
            product={product} 
            onSelect={(name) => setSelectedProduct(name)} 
          />
        ))}
      </main>

      {selectedProduct && (
        <ProductOptions
          product={selectedProduct}
          options={products.find(prod => prod.name === selectedProduct)?.options || []}
          onAddToCart={handleAddToCart}
          setSelectedProduct={setSelectedProduct}
        />
      )}

      {isCartVisible && (
        <Cart 
          cartItems={cartItems}
          cartCount={cartCount}
          setCartItems={setCartItems}
          setIsCartVisible={setIsCartVisible}
          handleRemoveFromCart={handleRemoveFromCart} 
          clearCart={clearCart} 
        />
      )}
    </div>
  );
};

export default App;
