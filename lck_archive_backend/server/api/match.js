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
  const sql = `SELECT m.match_date AS match_data, t1.team_name AS team1_name, t1.team_logo AS team1_logo, m.team1_score AS team1_score, t2.team_name AS team2_name, t2.team_logo AS team2_logo, m.team2_score AS team2_score, m.youtube_link FROM _match m INNER JOIN team t1 ON m.team1_id = t1.team_id INNER JOIN team t2 ON m.team2_id = t2.team_id`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send({ message: '서버 오류가 발생했습니다.' });
      return;
    }
  
    // 결과 반환
    res.json(rows);
  });
})

router.get('/insert/', verifyToken, (req, res) => {
  
  // 경기 목록 반환 로직 작성
  res.send('경기 목록 API - 관리자 ');
});

export default router;