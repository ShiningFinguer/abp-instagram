import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Registro
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashed });
    res.status(201).json({ message: 'Usuario creado', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: 'Usuario o contraseña incorrecta' });
    const match = await bcrypt.compare(password ,user.password);
    if (!match) return res.status(400).json({ error: 'Usuario o contraseña incorrecta' });
    const token = jwt.sign({ id: user._id }, 'SECRET_KEY', { expiresIn: '1d' });
    res.json({ message: 'Login exitoso', token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener perfil
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
