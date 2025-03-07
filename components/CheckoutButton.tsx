import { useState } from 'react';
import axios from 'axios';

type Customer = {
  name: string;
  email: string;
};

type CheckoutResponse = {
  init_point: string;
};

type CheckoutButtonProps = {
  amount: number;
  description: string;
  customer: Customer;
};

export default function CheckoutButton({
  amount,
  description,
  customer,
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post<CheckoutResponse>('/api/mercadopago/checkout', {
        amount,
        description,
        name: customer.name,
        email: customer.email,
      });

      if (data.init_point) {
        window.location.href = data.init_point;
      }
    } catch (error) {
      console.error('Erro ao iniciar o checkout:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-2xl w-full"
      disabled={loading}
      onClick={handleCheckout}
    >
      {loading ? 'Redirecionando...' : 'Finalizar Compra com Mercado Pago'}
    </button>
  );
}