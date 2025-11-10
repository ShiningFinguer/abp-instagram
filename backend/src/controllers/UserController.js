import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// Registro
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body
    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ username, email, password: hashed })
    res.status(201).json({ message: 'Usuario creado', user })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (!user)
      return res.status(404).json({ error: 'Usuario o contraseña incorrecta' })
    const match = await bcrypt.compare(password, user.password)
    if (!match)
      return res.status(400).json({ error: 'Usuario o contraseña incorrecta' })
    const token = jwt.sign({ id: user._id }, 'SECRET_KEY', { expiresIn: '1d' })
    res.json({ message: 'Login exitoso', token, user })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const user = await User.find()
    if (!user)
      return res.status(404).json({ error: 'Ningún usuario encontrado' })
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Obtener un usuario por ID
export const getUserByID = async (req, res) => {
  try {
    const { authorization } = req.headers
    const [, token] = authorization.split(' ')

    const { id } = jwt.verify(token, 'SECRET_KEY')
    const user = await User.findById(id)
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

//Actualizar perfil de usuario
export const updateUserProfile = async (req, res) => {
  try {
    const { username, email, profilePic, bio } = req.body;
    const user = await User.updateOne({ _id: req.params.id }, { username, email, profilePic, bio });
    res.status(201).json({ message: 'Usuario actualizada', user });
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

//Actualizar contraseña de usuario
export const updateUserPassword = async (req, res) => {
  try {
    // 1. Verificamos que venga el header
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Token ausente' });

    // 2. Extraemos el token del tipo "Bearer <token>"
    const [, token] = authHeader.split(' ');
    if (!token) return res.status(401).json({ message: 'Token inválido' });

    // 3. Verificamos el token y extraemos el id
    const { id } = jwt.verify(token, 'SECRET_KEY'); // ⚠️ mejor usar process.env.JWT_SECRET

    // 4. Encriptamos la nueva contraseña
    const { password } = req.body;
    if (!password) return res.status(400).json({ message: 'Falta la nueva contraseña' });

    const hashed = await bcrypt.hash(password, 10);

    // 5. Actualizamos la contraseña del usuario autenticado
    const user = await User.findByIdAndUpdate(id, { password: hashed }, { new: true });

    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    // 6. Enviamos respuesta
    res.status(200).json({ message: 'Contraseña actualizada correctamente' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Eliminar un usuario por ID
export const deleteUserByID = async (req, res) => {
  try {
    const user = await User.deleteOne({ _id: req.params.id });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.status(200).json({ message: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
