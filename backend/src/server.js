import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import cloudinary from 'cloudinary'

import { usersRouter } from './routes/users.js'
import { postsRouter } from './routes/posts.js'
import { likesRouter } from './routes/likes.js'
import { commentsRouter } from './routes/comments.js'
import { followsRouter } from './routes/follows.js'

dotenv.config()

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

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
app.use(usersRouter)
app.use(postsRouter)
app.use(likesRouter)
app.use(commentsRouter)
app.use(followsRouter)

app.get('/', (req, res) => {
  res.send('Api funcionando correctamente')
})

app.get('/*splat', async (req, res) => {
  res.send('Ruta no encontrada')
})

const PORT = 3000

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
