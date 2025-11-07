import express from 'express'
import https from 'https'
import fs from 'fs'
import path from 'path'
import mongoose from 'mongoose'
import cors from 'cors'
import userRouter from './routes/UserRouter.js'
import { postRouter } from './routes/PostRouter.js'
import { LikeRouter } from './routes/LikeRouter.js'

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
  'mongodb://admin:password@db:27017/abp-instagram?authSource=admin'

// Conectar a MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err))


export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado o inválido' });
  }

  const token = authHeader.split(' ')[1]; // obtiene el token después de 'Bearer'

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // guarda el usuario decodificado (por ej., { id: '123', email: '...' })
    next(); // continúa al controlador
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
};

app.use(express.json())
app.use(cors())
app.use(userRouter)
app.use(postRouter)
app.use(LikeRouter)




app.get('/', (req, res) => {
  res.send('Api funcionando correctamente')
})

app.get('/*splat', async (req, res) => {
  res.send('Ruta no encontrada')
})

const PORT = 3000

// Crear servidor HTTPS
https.createServer(options, app).listen(PORT, () => {
  console.log('Servidor HTTPS escuchando en https://localhost:3000')
})
