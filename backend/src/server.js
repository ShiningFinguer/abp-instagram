import express from 'express'
import https from 'https'
import fs from 'fs'
import path from 'path'
import mongoose from 'mongoose'
import User from './models/User.js'
import { fillUsers } from './fillUsers.js'
import userRouter from './routes/UserRouter.js'

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
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Agregar usuarios para pruebas
fillUsers()
  .then(() => console.log('Usuarios creados'))
  .catch(e => console.log(e.message));

app.use(express.json());
app.use('/api/users', userRouter)

app.get('/', (req, res) => {
  res.send('Api funcionando correctamente 111');
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/api/users', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUser = new User({ username, email, password });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


app.get('/*splat', async (req, res) => {
  res.send('Ruta no encontrada');
});

const PORT = 3000

// Crear servidor HTTPS
https.createServer(options, app).listen(PORT, () => {
  console.log('Servidor HTTPS escuchando en https://localhost:3000')
})
