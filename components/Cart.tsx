import React, { useState, useEffect } from 'react';
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
  const [cep, setCep] = useState('');
  const [shippingCost, setShippingCost] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'retirada' | 'entrega' | null>(null);
  const [discountCode, setDiscountCode] = useState('');
  const [discountValue, setDiscountValue] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<'cartao' | 'pix' | 'dinheiro' | null>(null);
  const [freeShippingUnlocked, setFreeShippingUnlocked] = useState(false);
  const [autoDiscount, setAutoDiscount] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');
  const whatsappNumber = '5521991453401';
  const freeShippingThreshold = 50;
  const discountForFreeShipping = 'FRETEGRATIS10';
  const autoDiscountValue = 0.2;

 
  const fetchShippingCost = async () => {
    if (freeShippingUnlocked) {
      setShippingCost(0);
      return;
    }

    if (cep.length !== 8) {
      setError('Digite um CEP válido (8 dígitos).');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setError('CEP inválido. Tente novamente.');
        setLoading(false);
        return;
      }

      const state = data.uf;
      const cost = state === 'RJ' ? 5 : 10;
      setShippingCost(freeShippingUnlocked ? 0 : cost);
    } catch {
      setError('Erro ao buscar o CEP.');
    } finally {
      setLoading(false);
    }
  };

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

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = totalPrice * discountValue;
  const finalTotal = (totalPrice - discountAmount + (shippingCost || 0)).toFixed(2);

  const progressPercentage = Math.min((totalPrice / freeShippingThreshold) * 100, 100);

  useEffect(() => {
    if (totalPrice >= freeShippingThreshold) {
      setFreeShippingUnlocked(true);
      setShippingCost(0);
      setAutoDiscount(true);
      setDiscountCode(discountForFreeShipping);
      setDiscountValue(autoDiscountValue);
    } else {
      setFreeShippingUnlocked(false);
      setAutoDiscount(false);
      setDiscountValue(0);
      setDiscountCode('');
    }
  }, [totalPrice]);

  const handleCheckout = () => {
    if (!paymentMethod || !deliveryMethod) {
      setCheckoutError('Selecione a forma de pagamento e entrega antes de prosseguir.');
      return;
    }
    setCheckoutError('');
    window.open(generateWhatsAppMessage(), '_blank');
  };

  const generateWhatsAppMessage = () => {
    const itemsText = cartItems
      .map(item => `• ${item.quantity}x ${item.name} (${item.option}) - R$ ${item.price.toFixed(2)}`)
      .join('%0A');

    const shippingText = deliveryMethod === 'entrega'
      ? `Frete: ${freeShippingUnlocked ? 'Grátis' : `R$ ${shippingCost?.toFixed(2) || '0.00'}`}`
      : 'Retirada em loja';

    const paymentText = paymentMethod ? `Forma de Pagamento: ${paymentMethod}` : 'Forma de Pagamento: Não informada';

    return `https://wa.me/${whatsappNumber}?text=Pedido:%0A${itemsText}%0A%0ACupom: ${discountCode || 'Nenhum'}%0A${shippingText}%0A${paymentText}%0A%0ATotal: R$ ${finalTotal}`;
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl flex flex-col md:flex-row gap-6 max-h-[90vh] overflow-y-auto">
        <button onClick={() => setIsCartVisible(false)} className="absolute top-3 right-3 text-gray-500">✖</button>

        <div className="w-full md:w-2/3 overflow-y-auto max-h-[70vh] pr-2">
          <h2 className="text-2xl font-bold mb-4">Carrinho de Compra</h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Seu carrinho está vazio.</p>
          ) : (
            <>
              <div className="bg-gray-100 p-3 rounded-lg">
                <p className="text-sm font-medium mb-1">Progresso para Frete Grátis e 20% de desconto:</p>
                <div className="w-full bg-gray-300 h-3 rounded-lg overflow-hidden">
                  <div className={`h-3 ${progressPercentage === 100 ? 'bg-green-500' : 'bg-yellow-500'}`} style={{ width: `${progressPercentage}%` }}></div>
                </div>
                <p className="text-xs text-center mt-1">
                  {progressPercentage === 100
                    ? 'Parabéns! Você ganhou Frete Grátis e 20% de desconto!'
                    : `Faltam R$ ${(freeShippingThreshold - totalPrice).toFixed(2)} para Frete Grátis!`}
                </p>
              </div>

              <ul className="space-y-4 overflow-y-auto max-h-[50vh] pr-2 mt-4">
                {cartItems.map((item, idx) => (
                  <li key={idx} className="flex items-center border-b pb-4 group">
                    <div className="relative w-16 h-16 overflow-hidden rounded-lg">
                      <Image width={64} height={64} src={item.image} alt={item.name} className="object-cover group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="ml-4 flex-grow">
                      <p className="font-bold text-lg">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.option}</p>
                      <p className="text-sm text-gray-600">R$ {item.price.toFixed(2)}</p>
                      <div className="flex items-center mt-2">
                        <button onClick={() => handleQuantityChange(idx, item.quantity - 1)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                        <span className="px-4">{item.quantity}</span>
                        <button onClick={() => handleQuantityChange(idx, item.quantity + 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                      </div>
                    </div>
                    <button onClick={() => removeItem(idx)} className="text-red-500">🗑</button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="w-full md:w-1/3 overflow-y-auto max-h-[70vh]">
          <h3 className="font-bold">Resumo do pedido</h3>
          <div className="mt-4">
           
            <label className="block text-sm text-gray-700">Forma de pagamento:</label>
            <label className="flex items-center gap-2 mt-2">
              <input type="radio" name="payment" value="cartao" onChange={() => setPaymentMethod('cartao')} /> Cartão
            </label>
            <label className="flex items-center gap-2 mt-2">
              <input type="radio" name="payment" value="pix" onChange={() => setPaymentMethod('pix')} /> Pix
            </label>
            <label className="flex items-center gap-2 mt-2">
              <input type="radio" name="payment" value="dinheiro" onChange={() => setPaymentMethod('dinheiro')} /> Dinheiro
            </label>
          </div>

          <div className="mt-4">
            <label className="block font-medium">Forma de entrega:</label>
            <label className="flex items-center gap-2 mt-2">
              <input type="radio" name="delivery" value="retirada" onChange={() => setDeliveryMethod('retirada')} /> Retirada em loja
            </label>
            <label className="flex items-center gap-2 mt-2">
              <input type="radio" name="delivery" value="entrega" onChange={() => setDeliveryMethod('entrega')} /> Entrega pela loja
            </label>
          </div>

          {deliveryMethod === 'entrega' && (
            <div className="mt-4">
              <label className="block text-sm text-gray-700">Digite seu CEP:</label>
              <input
                type="text"
                value={cep}
                onChange={(e) => setCep(e.target.value.replace(/\\D/g, ''))}
                className="w-full p-2 border rounded-lg mt-1"
                placeholder="Ex: 01001000"
                maxLength={8}
              />
              <button onClick={fetchShippingCost} className="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg">
                {loading ? 'Calculando...' : 'Calcular Frete'}
              </button>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              {shippingCost !== null && <p className="text-green-500 text-sm mt-2">Frete: {freeShippingUnlocked ? 'Grátis' : `R$ ${shippingCost.toFixed(2)}`}</p>}
            </div>
          )}

          {autoDiscount && (
            <p className="text-green-600 text-sm mt-4 text-center font-medium">Cupom aplicado automaticamente: {discountForFreeShipping} (20% OFF)</p>
          )}

          <p className="font-bold text-xl text-center mt-4">Total: R$ {finalTotal}</p>
          {checkoutError && <p className="text-red-500 text-sm text-center mt-2">{checkoutError}</p>}

          <div className="mt-4 flex flex-col gap-2">
            <button onClick={() => setCartItems([])} className="bg-red-500 text-white py-2 rounded-lg">Limpar Carrinho</button>
            <button
              onClick={handleCheckout}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors w-full md:w-auto text-center"
            >
              Comprar no WhatsApp
            </button>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;