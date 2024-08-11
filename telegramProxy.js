export default async function handler(req, res) {
    const { imageData } = req.body;
    
    const response = await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendPhoto`, {
        method: 'POST',
        body: JSON.stringify({
            chat_id: process.env.CHAT_ID,
            photo: imageData,
            caption: 'Here are the claimed reward details',
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();
    res.status(response.status).json(data);
}
