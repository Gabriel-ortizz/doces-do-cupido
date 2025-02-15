import type { NextApiRequest, NextApiResponse } from "next";
import mercadopago from "mercadopago";
import { CreatePreferencePayload } from "mercadopago/models/preferences/create-payload.model";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  if (!process.env.MERCADO_PAGO_ACCESS_TOKEN) {
    return res.status(500).json({ error: "Credenciais do Mercado Pago não configuradas." });
  }

  mercadopago.configure({
    access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN,
  });

  try {
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Carrinho vazio ou formato inválido." });
    }

    const preference: CreatePreferencePayload = {
      items: items.map(item => ({
        title: item.title,
        unit_price: item.unit_price,
        quantity: item.quantity,
        currency_id: "BRL",
      })),
      back_urls: {
        success: "https://seusite.com/sucesso",
        failure: "https://seusite.com/erro",
        pending: "https://seusite.com/pendente",
      },
      auto_return: "approved",
    };

    const response = await mercadopago.preferences.create(preference);

    res.status(200).json({ init_point: response.body.init_point });

  } catch (error) {
    console.error("Erro ao criar preferência:", error);
    res.status(500).json({ error: "Erro ao processar pagamento." });
  }
}
