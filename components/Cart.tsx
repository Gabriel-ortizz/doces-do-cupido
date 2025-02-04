'use client';
import React from 'react';
import Image from 'next/image';

type CartItem = {
  name: string;
  image: string;
  option: string;
  price: number;
  quantity: number;
};

type CartProps = {
  cartCount: number;
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  setIsCartVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleRemoveFromCart: (index: number) => void;
  clearCart: () => void;
};

const Cart: React.FC<CartProps> = ({
  cartItems,
  setIsCartVisible,
  handleRemoveFromCart,
  clearCart,
}) => {
  const whatsappNumber = '5521991453401'; 
  
  const generateWhatsAppMessage = () => {
    if (cartItems.length === 0) return '#';

    const productList = cartItems
      .map(
        (item) =>
          `- ${item.name} (${item.option}) x${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2)}`
      )
      .join('%0A');

    const total = cartItems
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);

    return `https://wa.me/${whatsappNumber}?text=Olá! Gostaria de comprar:%0A${productList}%0A%0ATotal: R$ ${total}`;
  };

  
  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/2">
        =
        <button
          onClick={() => setIsCartVisible(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>

       =
        <h2 className="text-xl font-bold mb-4">Carrinho</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">Seu carrinho está vazio.</p>
        ) : (
          <ul>
            {cartItems.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between mb-4 border-b pb-2"
              >
                <div className="flex items-center">
                  <Image
                  width={10}
                  height={10}
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <p className="font-bold">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.option}</p>
                    <p className="text-sm text-gray-600">Qtd: {item.quantity}</p>
                    <p className="text-sm text-gray-600">
                      Preço: R$ {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveFromCart(idx)}
                  className="text-red-500 text-sm"
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        )}

   
        <div className="mt-4">
          <p className="font-bold text-lg">Total: R$ {totalPrice}</p>
          <div className="mt-4 flex flex-col gap-2">
            {cartItems.length > 0 && (
              <a
                href={generateWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white py-2 px-4 rounded flex items-center justify-center"
              >
                Comprar no WhatsApp
              </a>
            )}
            <button
              onClick={clearCart}
              className="bg-red-500 text-white py-2 px-4 rounded"
            >
              Limpar Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
