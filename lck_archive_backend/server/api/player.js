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

//모든 플레이어 출력
router.get('/', (req, res) =>{
  const sql = `SELECT team.team_name ,player_id,player_name,player_nickname,player_position,player_img FROM player JOIN team ON player.team_id = team.team_id`;
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
// 플레이어 정보가져오기
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

// 플레이어 삽입
router.post('/insert/', verifyToken, (req, res) => {
  const { player_name, player_nickname, player_img, player_position, team_id } = req.body;
  const sql = `INSERT INTO player (player_name, player_nickname, player_img, player_position, team_id) VALUES (?, ?, ?, ?, ?)`;
  const values = [player_name, player_nickname, player_img, player_position, team_id];
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting player:', err);
      res.status(500).json({ message: '플레이어 삽입 중 오류가 발생했습니다.' });
    } else {
      res.send('플레이어 삽입 성공했습니다.');
    }
  });
});

// 플레이어 수정
router.put('/update/:player_id', verifyToken, (req, res) => {
  const { player_id } = req.params;
  const { player_name, player_nickname, player_img, player_position, team_id } = req.body;
  // 데이터베이스 업데이트 로직 작성
  const sql = `UPDATE player SET player_name = ?, player_nickname = ?, player_img = ?, player_position = ?, team_id = ? WHERE player_id = ?`;
  const values = [player_name, player_nickname, player_img, player_position, team_id, player_id];
  
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating player:', err);
      res.status(500).json({ message: '플레이어 업데이트 중 오류가 발생했습니다.' });
    } else {
      res.send('Player updated successfully.');
    }
  });
});

// 플레이어 삭제
router.delete('/delete/:player_id', verifyToken, (req, res) => {
  const { player_id } = req.params;

  // 데이터베이스 삭제 로직 작성
  const sql = `DELETE FROM player WHERE player_id = ?`;
  
  db.query(sql, [player_id], (err, result) => {
    if (err) {
      console.error('Error deleting player:', err);
      res.status(500).json({ message: '플레이어 삭제 중 오류가 발생했습니다.' });
    } else {
      res.send('Player deleted successfully.');
    }
  });
});

export default router;