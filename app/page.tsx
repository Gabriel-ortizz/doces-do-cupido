'use client';
import React, { useState } from 'react';

type CartItem = {
  name: string;
  image: string;
  quantity: number;
  option: string;
  price: number;
};

type Product = {
  name: string;
  image: string;
  options: { name: string; price: number }[];
};

const App: React.FC = () => {
  const [cartCount, setCartCount] = useState<number>(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartVisible, setIsCartVisible] = useState<boolean>(false);
  const [addMessageVisible, setAddMessageVisible] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedOptionPrice, setSelectedOptionPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const products: Product[] = [
    { 
      name: "Trufa de Brigadeiro", 
      image: "/img/TrufaDeBrigadeiro.jpg", 
      options: [
        { name: "Ao Leite", price: 2.00 },
        { name: "Branco", price: 2.50 },
        { name: "Meio Amargo", price: 2.80 }
      ] 
    },
    { 
      name: "Trufa de Limão", 
      image: "/img/TrufaDeLimao.jpg", 
      options: [
        { name: "Ao Leite", price: 2.00 },
        { name: "Branco", price: 2.50 },
        { name: "Meio Amargo", price: 2.80 }
      ] 
    },
  ];

  const addToCart = () => {
    if (!selectedProduct || !selectedOption) return;
    setCartCount(cartCount + 1);
    setCartItems([...cartItems, { 
      name: selectedProduct, 
      image: `/img/${selectedProduct}.jpg`, 
      quantity: quantity, 
      option: selectedOption, 
      price: selectedOptionPrice 
    }]);
    setAddMessageVisible(true);
    setTimeout(() => setAddMessageVisible(false), 2000);
    setSelectedProduct(null);
    setSelectedOption("");
    setSelectedOptionPrice(0);
    setQuantity(1);
  };

  const openOptions = (product: string) => {
    setSelectedProduct(product);
  };

  const updateCartView = () => {
    return cartItems.map((item, index) => (
      <li key={index} className="flex justify-between items-center p-3 border-b border-gray-300">
        <img src={item.image} alt={item.name} className="w-14 h-14 rounded-md" />
        <span className="text-sm">{item.name} ({item.option})</span>
        <div className="flex items-center space-x-2">
          <button onClick={() => decreaseQuantity(index)} className="text-gray-600">-</button>
          <span className="text-sm">{item.quantity}</span>
          <button onClick={() => increaseQuantity(index)} className="text-gray-600">+</button>
        </div>
        <span className="text-sm text-gray-600">R${(item.price * item.quantity).toFixed(2)}</span>
        <button onClick={() => removeItem(index)} className="ml-2 text-red-600 hover:text-red-800">Remover</button>
      </li>
    ));
  };

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  const removeItem = (index: number) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartCount(cartCount - 1);
    setCartItems(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
    setCartCount(0);
  };

  const buy = () => {
    if (cartItems.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }
    const phoneNumber = "+5521991453401";
    let message = "Olá! Gostaria de finalizar meu pedido:%0A";
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.option}) (x${item.quantity}) - R$${(item.price * item.quantity).toFixed(2)}%0A`;
    });
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
    window.open(whatsappUrl, "_blank");
    clearCart();
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const increaseQuantity = (index: number) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    setCartItems(updatedCart);
  };

  const decreaseQuantity = (index: number) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCartItems(updatedCart);
    }
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
        <div onClick={toggleCart} className="cursor-pointer p-3 rounded-lg hover:bg-pink-300 transition-all duration-200 flex items-center">
          🛒 <span className="ml-1">{cartCount}</span>
        </div>
      </header>

      <main className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {filteredProducts.map((product, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all duration-200"
            onClick={() => openOptions(product.name)}
          >
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <p className="text-lg font-semibold text-gray-700">{product.name}</p>
            </div>
          </div>
        ))}
      </main>

      {selectedProduct && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-lg w-80 sm:w-96 rounded-lg">
          <h2 className="text-xl mb-4 text-gray-800">Escolha uma opção para {selectedProduct}</h2>
          <div className="flex items-center mb-4">
            <img src={`/img/${selectedProduct}.jpg`} alt={selectedProduct} className="w-16 h-16 object-cover rounded-md mr-4" />
            <span className="text-lg text-gray-700">{selectedProduct}</span>
          </div>

          <div className="mb-4">
            <select 
              value={selectedOption} 
              onChange={(e) => {
                setSelectedOption(e.target.value);
                const selected = products
                  .find(prod => prod.name === selectedProduct)
                  ?.options.find(option => option.name === e.target.value);
                if (selected) {
                  setSelectedOptionPrice(selected.price);
                }
              }} 
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="">Selecione uma opção</option>
              {products
                .find((prod) => prod.name === selectedProduct)?.options
                .map((option, idx) => (
                  <option key={idx} value={option.name}>{option.name} - R${option.price.toFixed(2)}</option>
              ))}
            </select>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <span className="text-lg">Quantidade:</span>
            <div className="flex items-center space-x-2">
              <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} className="text-gray-600">-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="text-gray-600">+</button>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <button onClick={() => setSelectedProduct(null)} className="bg-gray-500 text-white p-3 rounded-lg">Cancelar</button>
            <button onClick={addToCart} className="bg-pink-500 text-white p-3 rounded-lg">Adicionar ao Carrinho</button>
          </div>
        </div>
      )}

      {isCartVisible && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-lg w-96 max-h-80 overflow-y-auto rounded-lg">
          <button onClick={toggleCart} className="absolute top-2 right-2 text-2xl text-gray-500">❌</button>
          <h2 className="text-2xl mb-4 text-gray-800">Carrinho de Compras</h2>
          <ul className="space-y-4">
            {updateCartView()}
          </ul>
          <div className="flex justify-between mt-4 text-xl">
            <span>Total:</span>
            <span>R${calculateTotal().toFixed(2)}</span>
          </div>
          <button onClick={clearCart} className="bg-red-500 text-white p-3 mt-4 w-full rounded-lg">Limpar Carrinho</button>
          <button onClick={buy} className="bg-green-500 text-white p-3 mt-2 w-full rounded-lg">Comprar pelo WhatsApp</button>
        </div>
      )}

      {addMessageVisible && (
        <div className="fixed bottom-0 left-0 w-full bg-pink-500 text-white p-4 rounded-lg shadow-lg transition-all duration-300 transform opacity-100">
          Produto adicionado ao carrinho!
        </div>
      )}
    </div>
  );
};

export default App;
