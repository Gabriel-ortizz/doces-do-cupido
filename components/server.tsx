import express, { Request, Response } from "express";
import cors from "cors";
import * as mercadopago from "mercadopago";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN || "",
});


app.post("/pagamento", async (req: Request, res: Response) => {
  try {
    const { descricao, preco, quantidade, email } = req.body;

    const pagamento = await mercadopago.preferences.create({
      items: [
        {
          title: descricao,
          quantity: quantidade,
          currency_id: "BRL",
          unit_price: parseFloat(preco),
        },
      ],
      payer: { email },
      back_urls: {
        success: "https://seusite.com/sucesso",
        failure: "https://seusite.com/falha",
        pending: "https://seusite.com/pendente",
      },
      auto_return: "approved",
    });

    res.json({ url: pagamento.body.init_point });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ erro: error.message });
    } else {
      res.status(500).json({ erro: "Erro desconhecido" });
    }
  }
});


app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
