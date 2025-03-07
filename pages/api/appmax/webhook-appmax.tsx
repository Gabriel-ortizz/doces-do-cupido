import { NextApiRequest, NextApiResponse } from 'next';

const whatsappNumberAdmin = '5521991453401'; // Seu número para receber confirmações
const whatsappApiUrl = 'https://api.whatsapp.com/send/?phone=5521991453401'; // URL da API oficial

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Método não permitido' });

  try {
    const { order_id, status, customer, amount } = req.body;

    if (status === 'approved') {
      const message = `*Pagamento Aprovado!* Pedido: #${order_id} Cliente: ${customer.name} Total: R$ ${amount} O pagamento foi confirmado!`;

      // Enviar mensagem para o admin
      await fetch(whatsappApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: whatsappNumberAdmin,
          message,
        }),
      });

      // Enviar mensagem para o cliente
      await fetch(whatsappApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: customer.phone,
          message,
        }),
      });

      console.log('Mensagens enviadas com sucesso');
    }

    res.status(200).json({ message: 'Webhook recebido' });
  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}
