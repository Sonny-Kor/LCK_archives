import express from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { verifyToken } from '../middleware/auth.js';
import fs from "fs"
import multer from "multer"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const imageFolderPath = path.join(__dirname, '../images/Players/');
const teamFolderPath = path.join(__dirname, '../images/TeamLogos/');

if (!fs.existsSync(imageFolderPath)) {
  fs.mkdirSync(imageFolderPath);
}

if (!fs.existsSync(teamFolderPath)) {
  fs.mkdirSync(teamFolderPath);
}

const storage = multer.diskStorage({
  destination: imageFolderPath,
  filename: (req, file, cb) => {
    // 원래 파일명 사용
    cb(null, file.originalname);
  },
  
});

const uploadplayer = multer({ storage });
const uploadTeam = multer({
  storage:multer.diskStorage({
    destination: teamFolderPath,
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
  }),
  limits: {fileSize: 5* 1024 * 1024}
})
const router = express.Router();

router.get('/:filename', (req, res) => {
  const { filename } = req.params;
  const imagePath = path.resolve(__dirname, '..', 'images', 'Players', filename);

  res.sendFile(imagePath);
});

router.get('/team/:filename', (req, res) => {
  const { filename } = req.params;
  const imagePath = path.resolve(__dirname, '..', 'images', 'TeamLogos', filename);

  res.sendFile(imagePath);
});


router.post('/player/insert/', uploadplayer.single('image'), (req, res) => {
  // 파일 업로드 완료
  res.status(200).json({ message: '이미지가 성공적으로 저장되었습니다.' });
});

router.post('/team/insert/', uploadTeam.single('image'), (req, res) => {
  // 파일 업로드 완료
  console.log(teamFolderPath)
  res.status(200).json({ message: '이미지가 성공적으로 저장되었습니다.2' });
});


export default router;