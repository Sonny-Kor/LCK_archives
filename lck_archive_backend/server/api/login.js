import express from 'express';
import jwt from 'jsonwebtoken';
import mysql from 'mysql';

import { dbconf, jwtSecret } from '../conf/auth.js';

const router = express.Router();
router.use(express.json()); //(Express 4.16 버전 이상)

const db = mysql.createConnection(dbconf);

db.connect((err) => {
  if (err) {
    console.error('Mysql 서버 접속 실패 ', err);
  }
});

router.post('/', (req, res) => {
  const username = req.body.a_id;
  const password = req.body.a_pw;

  // 데이터베이스에서 사용자 인증 로직
  const sql = `SELECT * FROM administer`;
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error during user authentication:', err);
      res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    } else {
      if (results.length > 0) {
        const user = results[0];
        if (user.a_id === username && user.a_pw === password) {
          // 사용자 인증이 성공한 경우 JWT 토큰 발급
          const token = jwt.sign({ username }, jwtSecret, { expiresIn: '1h' });
          res.json({ token });
        } else {
          res.status(401).json({ message: '유효하지 않은 사용자 이름 또는 비밀번호입니다.' });
        }
      } else {
        res.status(401).json({ message: '유효하지 않은 사용자 이름 또는 비밀번호입니다.' });
      }
    }
  });
});

router.get('/', (req, res) => {
  res.json({ result: 'success' });
});

export default router;