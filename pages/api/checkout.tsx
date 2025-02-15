import type { NextApiRequest, NextApiResponse } from "next";
const mercadopago = require("mercadopago"); 

if (!process.env.MERCADO_PAGO_ACCESS_TOKEN) {
  throw new Error("A variável de ambiente MERCADO_PAGO_ACCESS_TOKEN não está definida.");
}

mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { items } = req.body;

      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: "Itens inválidos na requisição." });
      }

    
      const preference = {
        items: items.map((item) => ({
          title: item.name,
          unit_price: Number(item.price),
          quantity: Number(item.quantity),
          currency_id: "BRL",
        })),
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_BASE_URL}/?success=true`,
          failure: `${process.env.NEXT_PUBLIC_BASE_URL}/?failure=true`,
          pending: `${process.env.NEXT_PUBLIC_BASE_URL}/?pending=true`,
        },
        auto_return: "approved",
      };

      const response = await mercadopago.preferences.create(preference);

      if (!response.body || !response.body.init_point) {
        throw new Error("Erro ao criar preferência de pagamento.");
      }

      res.status(200).json({ url: response.body.init_point });
    } catch (error) {
      const err = error as Error; 
      console.error("Erro ao processar pagamento:", err);
      res.status(500).json({ error: err.message || "Erro interno do servidor" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: "Método não permitido" });
  }
}
