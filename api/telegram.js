export default async function handler(request, response) {
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const data = request.body;
        const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
        const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

        if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
            return response.status(500).json({ error: 'Server configuration error' });
        }

        const message = `
🛠️ PERMINTAAN SERVICE BARU

👤 Nama: ${data.name}
📱 WhatsApp: ${data.phone}
💻 Perangkat: ${data.device}
❓ Keluhan: ${data.problem}
⏰ Waktu: ${data.timestamp}
        `.trim();

        const telegramResponse = await fetch(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: message
                })
            }
        );

        const result = await telegramResponse.json();

        if (!result.ok) {
            throw new Error(result.description);
        }

        response.status(200).json({ 
            success: true,
            message: 'Permintaan service berhasil dikirim ke admin'
        });

    } catch (error) {
        response.status(500).json({ 
            success: false,
            error: error.message 
        });
    }
}
