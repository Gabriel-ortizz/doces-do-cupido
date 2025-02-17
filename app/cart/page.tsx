"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CartItem {
  name: string;
  image: string;
  option: string;
  price: number;
  quantity: number;
}

const validCoupons: Record<string, number> = {
  DESCONTO10: 10, // 10% de desconto
  FRETEGRATIS: 5, // Simulando desconto fixo de R$5 no frete
};

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState<number>(0);
  const [couponMessage, setCouponMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (error) {
        console.error("Erro ao carregar o carrinho:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const handleQuantityChange = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = newQuantity;
    setCartItems(updatedCart);
  };

  const removeItem = (index: number) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const applyCoupon = () => {
    if (validCoupons[coupon.toUpperCase()]) {
      const discountValue = validCoupons[coupon.toUpperCase()];
      setDiscount(discountValue);
      setCouponMessage(`Cupom aplicado: -R$ ${discountValue.toFixed(2)}`);
    } else {
      setDiscount(0);
      setCouponMessage("Cupom inválido!");
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const finalTotal = (totalPrice - discount).toFixed(2);

  const handleFinalizePurchase = () => {
    const phoneNumber = "SEU_NUMERO_DE_WHATSAPP"; // Substitua pelo seu número de WhatsApp com código do país
    const orderSummary = cartItems.map(item => `➡ ${item.quantity}x ${item.name} (${item.option}) - R$ ${item.price.toFixed(2)}`).join("%0A");
    const couponText = coupon ? `%0ACupom aplicado: ${coupon.toUpperCase()} (-R$ ${discount.toFixed(2)})` : "";
    const message = `🛒 *Resumo do Pedido:*%0A${orderSummary}%0A--------------------%0ATotal: R$ ${finalTotal}${couponText}`;
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="max-w-4xl w-full bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Minha Sacola</h2>
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Seu carrinho está vazio.</p>
        ) : (
          <>
            <div className="border-b pb-4 mb-4">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-4 border-b">
                  <Image width={64} height={64} src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div className="flex-grow ml-4">
                    <p className="font-bold text-lg">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.option}</p>
                    <p className="text-sm text-gray-600">R$ {item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <button onClick={() => handleQuantityChange(idx, item.quantity - 1)} className="px-3 py-1 bg-gray-200 rounded">-</button>
                      <span className="px-4 text-lg font-semibold">{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(idx, item.quantity + 1)} className="px-3 py-1 bg-gray-200 rounded">+</button>
                    </div>
                  </div>
                  <button onClick={() => removeItem(idx)} className="text-red-500 text-lg">🗑</button>
                </div>
              ))}
            </div>
            <div className="mb-4">
              <input type="text" value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Insira o cupom" className="w-full p-2 border rounded-lg" />
              <button onClick={applyCoupon} className="mt-2 w-full bg-yellow-500 text-white py-2 rounded-lg">Aplicar Cupom</button>
              {couponMessage && <p className="text-green-500 text-sm mt-2">{couponMessage}</p>}
            </div>
            <p className="font-bold text-xl text-center mb-4">Total: R$ {finalTotal}</p>
            <button onClick={handleFinalizePurchase} className="bg-brown-600 text-white py-3 rounded-lg w-full text-center text-lg font-bold">Finalizar Pedido</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
