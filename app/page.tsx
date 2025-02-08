'use client';
import React, { useState } from 'react';
import Header from '@/components/Header';
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
      name: 'Trufas',
      image: '/img/Trufas.jpg',
      options: [
        { name: 'Limão', price: 2.0 },
        { name: 'Morango', price: 2.5 },
        { name: 'Brigadeiro', price: 2.8 },
        { name: 'Maracujá', price: 2.8 },
        { name: 'Beijinho', price: 2.8 },
      ],
    },
    {
      name: 'Barras',
      image: '/img/Barras.webp',
      options: [
        { name: 'Limão', price: 2.0 },
        { name: 'Morango', price: 2.5 },
        { name: 'Brigadeiro', price: 2.8 },
        { name: 'Maracujá', price: 2.8 },
        { name: 'Beijinho', price: 2.8 },
      ],
    },
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleAddToCart = (
    product: string,
    option: string,
    price: number,
    quantity: number,
  ) => {
    // Encontra o produto correspondente para obter o caminho correto da imagem
    const selectedProduct = products.find((p) => p.name === product);

    if (!selectedProduct) {
      console.error(`Produto não encontrado: ${product}`);
      return;
    }

    console.log(`Adicionando ao carrinho: ${selectedProduct.image}`);

    setCartItems((prevCartItems) => [
      ...prevCartItems,
      {
        name: product,
        image: selectedProduct.image, // Usando diretamente a imagem do produto
        quantity,
        option,
        price,
      },
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
        {filteredProducts.map((product, idx) => (
          <ProductCard
            key={idx}
            product={product}
            onSelect={() => setSelectedProduct(product.name)}
          />
        ))}
      </main>

      {selectedProduct && (
        <ProductOptions
          product={selectedProduct}
          options={
            products.find((prod) => prod.name === selectedProduct)?.options ||
            []
          }
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
  );
};

export default App;
