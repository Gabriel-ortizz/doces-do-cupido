import React from 'react';
import Image from 'next/image';

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

  const handleRemoveFromCart = (index: number) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white p-4 rounded-lg shadow-lg w-3/4 md:w-1/3 transition-transform transform hover:scale-105">
        <button
          onClick={() => setIsCartVisible(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors"
        >
          ✖
        </button>

        <h2 className="text-xl font-bold text-center text-gray-800 mb-4">Carrinho</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center">Seu carrinho está vazio.</p>
        ) : (
          <ul className="space-y-4">
            {cartItems.map((item, idx) => (
              <li key={idx} className="flex items-center justify-between border-b pb-4">
                <Image
                  width={64}
                  height={64}
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex flex-col justify-center ml-4 flex-grow">
                  <p className="font-bold text-lg">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.option}</p>
                  <p className="text-sm text-gray-600">Preço: R$ {(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleRemoveFromCart(idx)}
                    className="text-red-500 text-sm hover:underline transition-colors"
                  >
                    Remover
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

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
