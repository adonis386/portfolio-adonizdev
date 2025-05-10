import express from 'express';
import { sendTelegramMessage } from './contact';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  try {
    await sendTelegramMessage(req.body);
    res.json({ success: true });
  } catch (error) {
    console.error('Error in contact endpoint:', error);
    res.status(500).json({ success: false, error: 'Error al enviar el mensaje' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
