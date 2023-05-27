import jwt from 'jsonwebtoken';
import { jwtSecret } from '../conf/auth.js';

// 토큰 검증 미들웨어
function verifyToken(req, res, next) {
  const token = req.headers.authorization.split('Bearer ')[1];
  if (!token) {
    return res.status(403).json({ message: '토큰이 제공되지 않았습니다.' });
  }
  

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
    }

    req.username = decoded.username;
    next();
  });
}

export { verifyToken };