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
  const sql = `SELECT * FROM player`;
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

router.get('/:player_name', (req, res) => {
  const { player_name } = req.params;
  const query = 'SELECT team.team_name ,player_id,player_name,player_nickname,player_position,player_img FROM player JOIN team ON player.team_id = team.team_id WHERE player.player_name = ?';
  db.query(query, [player_name], (err, results) => {
    if (err) {
      console.error('Error while fetching player team:', err);
      res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    } else {
      if (results.length > 0) {
        res.send(results[0]);
      } else {
        res.status(404).json({ message: '해당 플레이어를 찾을 수 없습니다.' });
      }
    }
  });
});


router.get('/', verifyToken, (req, res) => {
  // 선수 목록 반환 로직 작성
  res.send('선수 목록 API');
});

export default router;