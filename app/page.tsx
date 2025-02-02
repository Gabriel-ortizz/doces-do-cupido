'use client';
import React, { useState } from 'react';

type CartItem = {
  name: string;
  image: string;
  quantity: number;
};

const App: React.FC = () => {
  const [cartCount, setCartCount] = useState<number>(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartVisible, setIsCartVisible] = useState<boolean>(false);
  const [purchaseMessageVisible, setPurchaseMessageVisible] = useState<boolean>(false);
  const [addMessageVisible, setAddMessageVisible] = useState<boolean>(false);

  const addToCart = (item: string, image: string) => {
    setCartCount(cartCount + 1);
    setCartItems([...cartItems, { name: item, image, quantity: 1 }]);
    setAddMessageVisible(true);
    setTimeout(() => setAddMessageVisible(false), 2000);
  };

  const updateCartView = () => {
    return cartItems.map((item, index) => (
      <li key={index} className="flex justify-between items-center">
        <img src={item.image} alt={item.name} width="50" />
        {item.name} (x{item.quantity})
        <button onClick={() => editItem(index)} className="ml-2 text-blue-500">Editar</button>
        <button onClick={() => removeItem(index)} className="ml-2 text-red-500">Excluir</button>
      </li>
    ));
  };

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  const editItem = (index: number) => {
    const newQuantity = prompt("Digite a nova quantidade:", cartItems[index].quantity.toString());
    if (newQuantity && !isNaN(Number(newQuantity)) && Number(newQuantity) > 0) {
      const updatedCart = [...cartItems];
      updatedCart[index].quantity = parseInt(newQuantity);
      setCartItems(updatedCart);
    }
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
      message += `${index + 1}. ${item.name} (x${item.quantity})%0A`;
    });

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
    window.open(whatsappUrl, "_blank");

    setPurchaseMessageVisible(true);
    setTimeout(() => setPurchaseMessageVisible(false), 3000);
    clearCart();
  };

  return (
    <div className="bg-pink-100 text-center">
      <header className="flex justify-between p-4 bg-pink-200 shadow-md">
        <img src="/img/Logo.jpg" alt="Logo" className="w-16" />
        <div onClick={toggleCart} className="cursor-pointer bg-white p-2 rounded-md">
          🛒 <span>{cartCount}</span>
        </div>
      </header>

      <main className="p-4">
        {["Trufa de Brigadeiro", "Trufa de Limão"].map((product, idx) => (
          <div
            key={idx}
            className="inline-block w-48 h-72 p-4 m-4 bg-white rounded-lg shadow-md text-center cursor-pointer"
            onClick={() => addToCart(product, `/img/${product}.jpg`)}
          >
            <img src={`/img/${product}.jpg`} alt={product} className="w-full h-48 rounded-md" />
            <p>{product} R$2,00</p>
          </div>
        ))}
      </main>

      {isCartVisible && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 shadow-lg max-h-80 overflow-y-auto w-80">
          <button onClick={toggleCart} className="absolute top-2 right-2 text-xl">❌</button>
          <h2 className="text-2xl">Carrinho de Compras</h2>
          <ul>{updateCartView()}</ul>
          <button onClick={clearCart} className="bg-red-500 text-white p-2 mt-2 w-full rounded-md">Limpar Carrinho</button>
          <button onClick={buy} className="bg-blue-500 text-white p-2 mt-2 w-full rounded-md">Comprar</button>
        </div>
      )}

      {addMessageVisible && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-2 rounded-md">
          Produto adicionado ao carrinho!
        </div>
      )}

      {purchaseMessageVisible && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white p-2 rounded-md">
          Compra realizada com sucesso!
        </div>
      )}
    </div>
  );
};

export default App;
