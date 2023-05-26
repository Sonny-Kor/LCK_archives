import express from 'express';
import mysql from 'mysql';
import { verifyToken } from '../middleware/auth.js';
import { dbconf } from '../conf/auth.js';

const router = express.Router();
router.use(express.json()); //(Express 4.16 버전 이상)

const db = mysql.createConnection(dbconf);

db.connect((err) => {
  if (err) {
    console.error('Mysql 서버 접속 실패 ', err);
  }
});

router.get('/', (req, res) =>{
  res.send("경기 목록 API - 일반 사용자 ");
})

router.get('/insert/', verifyToken, (req, res) => {
  
  // 경기 목록 반환 로직 작성
  res.send('경기 목록 API - 관리자 ');
});

export default router;