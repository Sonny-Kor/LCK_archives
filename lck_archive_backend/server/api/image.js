import express from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

router.get('/:filename', (req, res) => {
  const { filename } = req.params;
  const imagePath = path.resolve(__dirname, '..', 'images', 'Players', filename);

  res.sendFile(imagePath);
});

export default router;