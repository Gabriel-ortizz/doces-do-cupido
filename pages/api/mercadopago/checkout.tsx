import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type MercadoPagoResponse = {
  init_point: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { amount, description, name, email } = req.body;

  try {
    const response = await axios.post<MercadoPagoResponse>(
      'https://api.mercadopago.com/checkout/preferences',
      {
        items: [
          {
            title: description,
            quantity: 1,
            unit_price: Number(amount),
            currency_id: 'BRL',
          },
        ],
        payer: {
          name,
          email,
        },
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_BASE_URL}/sucesso`,
          failure: `${process.env.NEXT_PUBLIC_BASE_URL}/falha`,
          pending: `${process.env.NEXT_PUBLIC_BASE_URL}/pendente`,
        },
        auto_return: 'approved',
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
        },
      }
    );

    res.status(200).json({ init_point: response.data.init_point });
  } catch (error) {
    console.error('Erro ao gerar checkout:', error);
    res.status(500).json({ error: 'Erro ao gerar checkout.' });
  }
}
