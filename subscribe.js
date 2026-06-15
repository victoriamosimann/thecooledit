// api/subscribe.js — Vercel Serverless Function
export default async function handler(req, res) {
  // Só aceita POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Email inválido' });
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY
      },
      body: JSON.stringify({
        email: email,
        listIds: [2],
        updateEnabled: true
      })
    });

    // 201 = criado, 204 = já existe mas atualizado
    if (response.ok || response.status === 204) {
      return res.status(200).json({ success: true });
    }

    const data = await response.json();

    // Contato já existe na lista — tudo bem
    if (response.status === 400 && data.code === 'duplicate_parameter') {
      return res.status(200).json({ success: true });
    }

    return res.status(500).json({ error: 'Erro ao inscrever' });

  } catch (err) {
    console.error('Brevo error:', err);
    return res.status(500).json({ error: 'Erro interno' });
  }
}
