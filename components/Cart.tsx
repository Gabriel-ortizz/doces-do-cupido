import React from 'react';

type CartItem = {
  name: string;
  image: string;
  quantity: number;
  option: string;
  price: number;
};

type CartProps = {
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
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/2">
        <h2 className="text-xl font-bold mb-4">Carrinho ({cartCount} itens)</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Seu carrinho está vazio.</p>
        ) : (
          <ul>
            {cartItems.map((item, idx) => (
              <li key={idx} className="flex justify-between items-center mb-4">
                <div>
                  <p className="font-bold">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.option}</p>
                  <p className="text-sm text-gray-600">Qtd: {item.quantity}</p>
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
        <div className="mt-4 flex justify-between">
          <button
            onClick={clearCart}
            className="bg-red-500 text-white py-2 px-4 rounded"
          >
            Limpar Carrinho
          </button>
          <button
            onClick={() => setIsCartVisible(false)}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
