"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
  option: string;
}

const WHATSAPP_NUMBER = "SEU_NUMERO_DE_TELEFONE"; // Substitua pelo número real

const FRETE_GRATIS_VALOR_MINIMO = 200;
const VALOR_PROMOCAO_CHOCOLATE = 300;

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [shippingOption, setShippingOption] = useState("store");
  const [coupon, setCoupon] = useState("");
  const [couponFeedback, setCouponFeedback] = useState("");
  const [comments, setComments] = useState("");
  const [freteGratis, setFreteGratis] = useState(false);
  const [ganhouChocolate, setGanhouChocolate] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCartItems(JSON.parse(storedCart));
  }, []);

  useEffect(() => {
    if (total >= FRETE_GRATIS_VALOR_MINIMO) setFreteGratis(true);
    else setFreteGratis(false);

    if (total >= VALOR_PROMOCAO_CHOCOLATE) setGanhouChocolate(true);
    else setGanhouChocolate(false);
  }, [cartItems]);

  const handleQuantityChange = (index: number, newQuantity: number) => {
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems];
      if (newQuantity < 1) return updatedItems;
      updatedItems[index].quantity = newQuantity;
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((_, i) => i !== index);
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const handleEmptyCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  const handleContinueShopping = () => {
    router.push("/");
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shippingCost =
    shippingOption === "delivery" && !freteGratis ? 15 : 0;
  const discount = coupon === "DESCONTO10" ? total * 0.1 : 0;
  const finalTotal = total + shippingCost - discount;

  const handleApplyCoupon = () => {
    if (coupon === "DESCONTO10") {
      setCouponFeedback("✅ Cupom aplicado: 10% de desconto!");
    } else {
      setCouponFeedback("❌ Cupom inválido. Tente novamente.");
    }
  };

  const handleCheckout = () => {
    const orderSummary = cartItems
      .map(
        (item) =>
          `${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}`
      )
      .join("\n");

    const promocaoChocolate = ganhouChocolate
      ? "🎉 Você ganhou um cupom especial do Desafio do Chocolate!\\n"
      : "";

    const message = `Olá! Gostaria de finalizar a compra com os seguintes itens:\\n${orderSummary}\\n\\nFrete: ${
      shippingOption === "delivery"
        ? freteGratis
          ? "Entrega (Grátis)"
          : "Entrega (R$ 15,00)"
        : "Retirada na loja"
    }\\nDesconto aplicado: R$ ${discount.toFixed(2)}\\n${promocaoChocolate}Comentários: ${
      comments || "Nenhum"
    }\\n\\nValor Total: R$ ${finalTotal.toFixed(2)}`;

    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="p-6 min-h-screen bg-pink-50">
      <h1 className="text-3xl font-bold mb-6">🛒 Seu Carrinho</h1>
      {cartItems.length === 0 ? (
        <p className="text-lg text-gray-600">Seu carrinho está vazio.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-6 lg:col-span-2">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-start bg-white p-6 rounded-lg shadow-lg gap-6"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h2 className="font-semibold text-lg">{item.name}</h2>
                  <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                  <p>Opção: {item.option}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => handleQuantityChange(index, item.quantity - 1)}
                      className="bg-gray-200 px-2 rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(index, item.quantity + 1)}
                      className="bg-gray-200 px-2 rounded"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-semibold mt-2">
                    Preço: R$ {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveItem(index)}
                  className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600"
                >
                  Remover
                </button>
              </div>
            ))}

            <div className="flex justify-between gap-4">
              <button
                onClick={handleContinueShopping}
                className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600"
              >
                Continuar Comprando
              </button>
              <button
                onClick={handleEmptyCart}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
              >
                Esvaziar Carrinho
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
            <h2 className="text-2xl font-semibold">Resumo do Pedido</h2>

            {freteGratis && (
              <p className="text-green-600 font-medium">
                🎁 Parabéns! Você ganhou frete grátis!
              </p>
            )}

            {ganhouChocolate && (
              <p className="text-purple-600 font-medium">
                🍫 Promoção Desafio do Chocolate: Você receberá um cupom especial!
              </p>
            )}

            <div>
              <p className="font-medium mb-2">Opções de entrega:</p>
              <label className="block mb-2 cursor-pointer">
                <input
                  type="radio"
                  value="store"
                  checked={shippingOption === "store"}
                  onChange={() => setShippingOption("store")}
                  className="mr-2"
                />
                Retirada na loja (Grátis)
              </label>
              <label className="block cursor-pointer">
                <input
                  type="radio"
                  value="delivery"
                  checked={shippingOption === "delivery"}
                  onChange={() => setShippingOption("delivery")}
                  className="mr-2"
                />
                Entrega pela loja ({freteGratis ? "Grátis" : "R$ 15,00"})
              </label>
            </div>

            <div>
              <label className="block font-medium mb-1">Cupom de Desconto:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Digite o código do cupom"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600"
                >
                  Aplicar
                </button>
              </div>
              {couponFeedback && (
                <p
                  className={`mt-1 ${coupon === "DESCONTO10" ? "text-green-600" : "text-red-500"}`}
                >
                  {couponFeedback}
                </p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">Comentários no Pedido:</label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="w-full p-2 border rounded-lg"
                placeholder="Ex.: Entregar após as 18h"
              />
            </div>

            <div className="border-t pt-4 space-y-2 text-right">
              <p>Subtotal: R$ {total.toFixed(2)}</p>
              <p>Frete: R$ {shippingCost.toFixed(2)}</p>
              <p>Desconto: R$ {discount.toFixed(2)}</p>
              <p className="font-bold text-lg">Total: R$ {finalTotal.toFixed(2)}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Formas de Pagamento:</h3>
              <ul className="list-disc ml-5 text-gray-700">
                <li>Cartão de Crédito/Débito</li>
                <li>Pix</li>
                <li>Boleto Bancário</li>
              </ul>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-all"
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;