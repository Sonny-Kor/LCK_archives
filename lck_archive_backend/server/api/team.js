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

// 전체 팀 반환
router.get('/', (req, res) =>{
  const sql = `SELECT * FROM team`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
  
    // 결과 반환
    res.json(rows);
  });
})

// 특정 팀의 플레이어 가져오기
router.get('/:team_name', (req, res) => {
  const { team_name } = req.params;
  const query = 'SELECT player.player_name FROM player JOIN team ON player.team_id = team.team_id WHERE team.team_name = ?';
  db.query(query, [team_name], (err, results) => {
    if (err) {
      console.error('Error while fetching team players:', err);
      res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    } else {
      if (results.length > 0) {
        const players = results.map((result) => result.player_name);
        res.send({ players });
      } else {
        res.status(404).json({ message: '해당 팀을 찾을 수 없습니다.' });
      }
    }
  });
});



router.get('/insert/', verifyToken, (req, res) => {
  // 팀 목록 반환 로직 작성
  res.send('팀 목록 API');
});

export default router;