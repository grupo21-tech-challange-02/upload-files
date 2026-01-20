import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
app.use(cors());

// Configura Cloudinary com suas credenciais
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

// Endpoint de upload
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Nenhum arquivo enviado' });

    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto' }, // imagens, PDFs, etc.
      (error, result) => {
        if (error) return res.status(500).json({ error });
        res.json({ name: req.file.originalname, url: result.secure_url });
      }
    );

    stream.end(req.file.buffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao enviar arquivo' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend rodando na porta ${PORT}`));
console.log('Cloudinary config:', process.env.CLOUD_NAME, process.env.CLOUD_API_KEY ? 'OK' : 'Missing');
