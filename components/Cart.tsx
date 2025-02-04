type CartItem = {
  name: string;
  image: string;
  quantity: number;
  option: string;
  price: number;
};

type CartProps = {
  cartItems: CartItem[];
  cartCount: number;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  setIsCartVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleRemoveFromCart: (index: number) => void;
  clearCart: () => void; // Recebe a função clearCart
};

const Cart: React.FC<CartProps> = ({ cartItems, cartCount, setCartItems, setIsCartVisible, handleRemoveFromCart, clearCart }) => {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-lg w-96 max-h-80 overflow-y-auto rounded-lg">
      <button onClick={() => setIsCartVisible(false)} className="absolute top-2 right-2 text-2xl text-gray-600">❌</button>
      <h2 className="text-2xl mb-4 text-gray-800">Carrinho de Compras</h2>
      <ul className="space-y-4">
        {cartItems.map((item, idx) => (
          <li key={idx} className="flex justify-between items-center">
            <img src={item.image} alt={item.name} className="w-12 h-12 rounded-md" />
            <span>{item.name} ({item.option}) x{item.quantity}</span>
            <button onClick={() => handleRemoveFromCart(idx)} className="text-red-500">Excluir</button>
          </li>
        ))}
      </ul>
      <div className="flex justify-between mt-4 text-xl">
        <span>Total:</span>
        <span>R${calculateTotal().toFixed(2)}</span>
      </div>
      <button onClick={clearCart} className="bg-red-500 text-white p-3 mt-4 w-full rounded-lg">Limpar Carrinho</button>
      <button className="bg-green-500 text-white p-3 mt-2 w-full rounded-lg">Comprar pelo WhatsApp</button>
    </div>
  );
};

export default Cart;
