import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import cors from 'cors';

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
app.use(cors());

// Configurar Cloudinary com variáveis de ambiente
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Endpoint de upload
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const fileBuffer = req.file?.buffer;
    if (!fileBuffer) return res.status(400).json({ error: 'Nenhum arquivo enviado' });

    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto' }, // aceita imagens, PDFs, etc.
      (error, result) => {
        if (error) return res.status(500).json({ error });
        res.json({ url: result.secure_url, name: req.file?.originalname });
      }
    );

    stream.end(fileBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao enviar arquivo' });
  }
});

app.listen(3000, () => console.log('Backend rodando na porta 3000'));
