import express from 'express'
import https from 'https'
import fs from 'fs'
import path from 'path'
import mongoose from 'mongoose'
import cors from 'cors'
import userRouter from './routes/UserRouter.js'
import { postRouter } from './routes/PostRouter.js'
import { LikeRouter } from './routes/LikeRouter.js'
import { CommentRouter } from './routes/CommentRouter.js'
import { FollowRouter } from './routes/FollowRouter.js'

// Cargar certificados
const __dirname = process.cwd()
const options = {
  key: fs.readFileSync(path.join(__dirname, 'tls/server.key')),
  cert: fs.readFileSync(path.join(__dirname, 'tls/server.crt')),
  ca: fs.readFileSync(path.join(__dirname, 'tls/ca.crt')), // confianza opcional
  requestCert: false, // ponlo en true si usas mTLS
  rejectUnauthorized: false, // solo en desarrollo
}

const app = express()

// URL de conexión a MongoDB
const mongoURI =
  process.env.MONGO_URL ||
  'mongodb://admin:password@db:27017/abp-instagram?authSource=admin'

// Conectar a MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err))

app.use(express.static('public'))
app.use(express.json())
app.use(cors())
app.use(userRouter)
app.use(postRouter)
app.use(LikeRouter)
app.use(CommentRouter)
app.use(FollowRouter)

app.get('/', (req, res) => {
  res.send('Api funcionando correctamente')
})

app.get('/*splat', async (req, res) => {
  res.send('Ruta no encontrada')
})

const PORT = 3000

// Crear servidor HTTPS
// https.createServer(options, app).listen(PORT, () => {
//   console.log('Servidor HTTPS escuchando en https://localhost:3000')
// })

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
