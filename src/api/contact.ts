import axios from 'axios';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  token: string;
}

export const sendTelegramMessage = async (data: ContactFormData) => {
  const { name, email, subject, message, token } = data;
  const chatId = await getChatId(token);
  
  if (!chatId) {
    throw new Error('No se pudo obtener el chat ID');
  }

  const text = `
🚀 Nuevo Mensaje de Contacto

👤 Nombre: ${name}
📧 Email: ${email}
📝 Asunto: ${subject}

💬 Mensaje:
${message}
  `;

  const telegramApiUrl = `https://api.telegram.org/bot${token}/sendMessage`;
  
  try {
    await axios.post(telegramApiUrl, {
      chat_id: chatId,
      text,
      parse_mode: 'HTML'
    });
    return true;
  } catch (error) {
    console.error('Error sending telegram message:', error);
    throw error;
  }
};

const getChatId = async (token: string): Promise<string | null> => {
  try {
    const response = await axios.get(`https://api.telegram.org/bot${token}/getUpdates`);
    const updates = response.data.result;
    
    if (updates && updates.length > 0) {
      // Obtener el último mensaje
      const lastUpdate = updates[updates.length - 1];
      return lastUpdate.message.chat.id.toString();
    }
    
    return null;
  } catch (error) {
    console.error('Error getting chat ID:', error);
    return null;
  }
};
