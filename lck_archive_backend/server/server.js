import express from 'express'

import cors from "cors"

import loginRouter from './api/login.js';
import teamRouter from './api/team.js';
import playerRouter from './api/player.js';
import matchRouter from './api/match.js';
import imageRouter from './api/image.js';

const app = express();
const port = 3010;

app.use(cors())

// API 라우트 설정
app.use('/login', loginRouter);
app.use('/team', teamRouter);
app.use('/player', playerRouter);
app.use('/match', matchRouter);
app.use('/image', imageRouter);

app.get('/', (req, res) => {
  res.json({result: "success"})
})

// 서버 실행
app.listen(port, () => {
  console.log(`서버 실행됨 (port ${port})`)
})



// const app = express()
// const port = 3010

// const db = mysql.createConnection(dbconf)

// db.connect()

// app.use(cors())
// app.use(bodyParser.json())

// app.get('/', (req, res) => {
//   res.json({result: "success"})
// })

// app.listen(port, () => {
//   console.log(`서버 실행됨 (port ${port})`)
// })