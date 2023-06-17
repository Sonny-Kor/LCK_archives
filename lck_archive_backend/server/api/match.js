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

router.get('/', (req, res) => {
  const sql = `SELECT m.match_id AS match_id, 
  m.match_date AS match_data,
   t1.team_name AS team1_name, 
   t1.team_logo AS team1_logo, 
   m.team1_score AS team1_score, 
   t2.team_name AS team2_name, 
   t2.team_logo AS team2_logo, 
   m.team2_score AS team2_score, 
   m.youtube_link FROM _match m INNER JOIN team t1 ON m.team1_id = t1.team_id INNER JOIN team t2 ON m.team2_id = t2.team_id`;
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

router.post('/insert/', verifyToken, (req, res) => {
  const { match_date, team1_id, team1_score, team2_id, team2_score, youtube_link } = req.body;
  const query = 'INSERT INTO _match (match_date, team1_id,team1_score,team2_id,team2_score,youtube_link) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [match_date, team1_id, team1_score, team2_id, team2_score, youtube_link];
  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200).json({ message: '성공적으로 저장되었습니다.' });
  })
});

router.put('/update/:match_id', verifyToken, (req, res) => {
  const { match_id } = req.params;
  const { match_date, team1_id, team1_score, team2_id, team2_score, youtube_link } = req.body;
  const query = `UPDATE _match SET match_date = ?, team1_id = ?, team1_score = ?, team2_id = ? , team2_score = ? , youtube_link = ?  WHERE match_id = ?`;
  const values = [match_date, team1_id, team1_score, team2_id, team2_score, youtube_link, match_id];
  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
      return;
    } res.status(200).json({ message: '성공적으로 저장되었습니다.' });
  })
});

router.delete('/delete/:match_id', verifyToken, (req, res) => {
  const { match_id } = req.params;
  const query = 'DELETE FROM _match WHERE match_id = ?';
  db.query(query, [match_id], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200).json({ message: '성공적으로 삭제되었습니다.' });
  })
});

export default router;