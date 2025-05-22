const axios = require('axios');


const sendTelegramMessage = async (user) => {

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  const message = `📥 Yeni Kayıt!
👤 Kullanıcı Adı: ${user.name}
📧 E-Posta: ${user.email}
🎂 Doğum Tarihi: ${user.birthDate}`;

  try {
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: message,
    });
  } catch (error) {
    console.error('Telegram mesajı gönderilemedi:', error.response?.data || error.message);
  }
};

module.exports = sendTelegramMessage;
