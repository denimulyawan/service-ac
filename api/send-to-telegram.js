// api/send-to-telegram.js

export default async function handler(req, res) {
    // GANTI DENGAN TOKEN DARI BOTFATHER!!!
    const BOT_TOKEN = '8433623197:AAF2O_CsRlR418Psq6ys2INYcgNgeHMwPOU';
    
    // GANTI DENGAN CHAT ID DARI getUpdates!!!
    const CHAT_ID = '-1003858096411';
    
    // CORS biar aman
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle OPTIONS (preflight)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    // Hanya terima POST
    if (req.method !== 'POST') {
        return res.status(200).json({ message: 'API is running' });
    }
    
    const data = req.body;
    
    const pesan = `
━━━━━━━━━━━━━━━━━━━━
📋 PESANAN BARU PW TEKNIK
━━━━━━━━━━━━━━━━━━━━
👤 Nama: ${data.nama}
📱 WhatsApp: ${data.wa}
📍 Kelurahan: ${data.kelurahan}
🏠 Alamat: ${data.detailAlamat}
❄️ Jenis AC: ${data.jenisAC}
🔧 Layanan: ${data.layanan}
💬 Keluhan: ${data.keluhan || '-'}
📅 Tanggal: ${data.tanggal}
━━━━━━━━━━━━━━━━━━━━
⏰ Booking via website PW TEKNIK
    `;
    
    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: pesan
            })
        });
        
        const result = await response.json();
        
        if (result.ok) {
            res.status(200).json({ status: 'ok' });
        } else {
            res.status(500).json({ error: result.description });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}