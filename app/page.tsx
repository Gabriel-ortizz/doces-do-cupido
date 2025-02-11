'use client';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import ProductOptions from '@/components/ProductOptions';
import Cart from '@/components/Cart';
import MaintenancePage from '@/components/MaintenancePage';

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
  const isUnderMaintenance = false; // Alterar para true para ativar a manutenção

  const products: Product[] = [
    {
      name: 'Trufas',
      image: '/img/Trufas.jpg',
      options: [
        { name: 'Limão', price: 4.5 },
        { name: 'Morango', price: 4.5 },
        { name: 'Brigadeiro', price: 4.5 },
        { name: 'Maracujá', price: 4.5 },
        { name: 'Beijinho', price: 4.5 },
      ],
    },
    {
      name: 'Barras',
      image: '/img/Barras.webp',
      options: [
        { name: 'Limão', price: 12.0 },
        { name: 'Morango', price: 12.0 },
        { name: 'Brigadeiro', price: 12.0 },
        { name: 'Maracujá', price: 12.0 },
        { name: 'Beijinho', price: 12.0 },
      ],
    },
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (productName: string, option: string, price: number, quantity: number) => {
    const selectedProduct = products.find((p) => p.name === productName);
    if (!selectedProduct) return;

    setCartItems((prevCartItems) => [
      ...prevCartItems,
      { name: productName, image: selectedProduct.image, quantity, option, price },
    ]);
  };

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <Router>
      {isUnderMaintenance ? (
        <Routes>
          <Route path="*" element={<Navigate to="/maintenance" replace />} />
          <Route path="/maintenance" element={<MaintenancePage />} />
        </Routes>
      ) : (
        <div className="bg-pink-50 min-h-screen text-center p-6">
          <Header
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            cartCount={cartCount}
            setIsCartVisible={setIsCartVisible}
          />

          <main className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.name}
                product={product}
                onSelect={() => setSelectedProduct(product.name)}
              />
            ))}
          </main>

          {selectedProduct && (
            <ProductOptions
              product={selectedProduct}
              options={products.find((prod) => prod.name === selectedProduct)?.options || []}
              onAddToCart={handleAddToCart}
              setSelectedProduct={setSelectedProduct}
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
      )}
    </Router>
  );
};

export default App;
