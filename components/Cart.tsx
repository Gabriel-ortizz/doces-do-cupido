import React, { useState } from 'react';
import Image from 'next/image';

interface CartItem {
  name: string;
  image: string;
  option: string;
  price: number;
  quantity: number;
}

interface CartProps {
  cartItems?: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  setIsCartVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Cart: React.FC<CartProps> = ({ cartItems = [], setCartItems, setIsCartVisible }) => {
  const handleQuantityChange = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = newQuantity;
    setCartItems(updatedCart);
  };

  const removeItem = (index: number) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems.map(item => ({
            title: item.name,
            quantity: item.quantity,
            unit_price: item.price,
          })),
        }),
      });

      const data = await response.json();
      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        alert("Erro ao redirecionar para o pagamento.");
      }
    } catch (error) {
      console.error("Erro ao iniciar checkout:", error);
      alert("Erro ao processar o pagamento.");
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl flex flex-col md:flex-row gap-6">
        <button onClick={() => setIsCartVisible(false)} className="absolute top-3 right-3 text-gray-500">
          ✖
        </button>

        <div className="w-full md:w-2/3">
          <h2 className="text-2xl font-bold mb-4">Carrinho de Compras</h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Seu carrinho está vazio.</p>
          ) : (
            <ul className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
              {cartItems.map((item, idx) => (
                <li key={idx} className="flex items-center border-b pb-4">
                  <Image width={64} height={64} src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div className="ml-4 flex-grow">
                    <p className="font-bold text-lg">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.option}</p>
                    <p className="text-sm text-gray-600">R$ {item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <button onClick={() => handleQuantityChange(idx, item.quantity - 1)} className="px-2 py-1 bg-gray-200 rounded">
                        -
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(idx, item.quantity + 1)} className="px-2 py-1 bg-gray-200 rounded">
                        +
                      </button>
                    </div>
                  </div>
                  <button onClick={() => removeItem(idx)} className="text-red-500">🗑</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="w-full md:w-1/3">
          <h3 className="font-bold">Resumo do pedido</h3>
          <p className="font-bold text-xl text-center mt-4">Total: R$ {totalPrice.toFixed(2)}</p>

          <button onClick={handleCheckout} className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg">
            Pagar com Mercado Pago 💳
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
