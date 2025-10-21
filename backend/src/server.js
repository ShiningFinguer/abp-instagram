import express from 'express';
import mongoose from 'mongoose';
import User from './models/User.js';
import { fillUsers } from './fillUsers.js';

const app = express(); // para parsear JSON en requests

// URL de conexión a MongoDB
const mongoURI = 'mongodb://admin:password@db:27017/abp?authSource=admin';

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
  const { username, password } = req.body;

  try {
    const newUser = new User({ username, password });
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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
