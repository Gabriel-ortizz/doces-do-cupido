'use client';
import React from 'react';
import Image from 'next/image';

// Tipos
interface CartItem {
  name: string;
  image: string;
  option: string;
  price: number;
  quantity: number;
}

interface CartProps {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  setIsCartVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Cart: React.FC<CartProps> = ({ cartItems, setCartItems, setIsCartVisible }) => {
  const whatsappNumber = '5521991453401';

  // Gerar link para WhatsApp
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

  // Atualizar quantidade
  const updateQuantity = (index: number, change: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
      )
    );
  };

  // Remover item
  const handleRemoveFromCart = (index: number) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  // Limpar carrinho
  const clearCart = () => setCartItems([]);

  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white p-4 rounded-lg shadow-lg w-3/4 md:w-1/3 transition-transform transform hover:scale-105">
        {/* Botão de Fechar */}
        <button
          onClick={() => setIsCartVisible(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors"
        >
          ✖
        </button>

        <h2 className="text-xl font-bold text-center text-gray-800 mb-4">Carrinho</h2>

        {/* Lista de Itens no Carrinho */}
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center">Seu carrinho está vazio.</p>
        ) : (
          <ul className="space-y-4">
            {cartItems.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between border-b pb-4 hover:bg-gray-50 transition-all"
              >
                {/* Imagem alinhada corretamente */}
                <Image
                  width={64}
                  height={64}
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg transition-transform transform hover:scale-110"
                />
                
                {/* Informações do Produto */}
                <div className="flex flex-col justify-center ml-4 flex-grow">
                  <p className="font-bold text-lg">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.option}</p>
                  <p className="text-sm text-gray-600">Preço: R$ {(item.price * item.quantity).toFixed(2)}</p>
                </div>

                {/* Controles de Quantidade */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(idx, -1)}
                    className="bg-gray-200 p-2 rounded-md text-gray-600 hover:bg-gray-300 transition-colors"
                  >
                    -
                  </button>
                  <p className="text-sm">{item.quantity}</p>
                  <button
                    onClick={() => updateQuantity(idx, 1)}
                    className="bg-gray-200 p-2 rounded-md text-gray-600 hover:bg-gray-300 transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Botão Remover */}
                <button
                  onClick={() => handleRemoveFromCart(idx)}
                  className="text-red-500 text-sm hover:underline transition-colors ml-4"
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Resumo do Carrinho */}
        <div className="mt-4">
          <p className="font-bold text-xl text-gray-800">Total: R$ {totalPrice}</p>

          <div className="mt-4 flex justify-between">
            <button
              onClick={clearCart}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
            >
              Limpar Carrinho
            </button>

            {cartItems.length > 0 && (
              <a
                href={generateWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
              >
                Comprar no WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
