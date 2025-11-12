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
    if (user.length === 0) return res.status(404).json({ error: 'Ningún usuario encontrado' })
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}



// UserController.js
export const getUsersFiltered = async (req, res) => {
  try {
    const name = req.params.name || "";

    if (!name.trim()) {
      return res.status(400).json({ error: "Debes proporcionar un nombre para buscar"});
    }

    const users = await User.find({
      username: { $regex: name, $options: "i" } // insensible a mayúsculas
    }).limit(50);

    if (users.length === 0) {
      return res.status(404).json({ error: "No se encontraron usuarios" });
    }

    res.json(users);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Obtener un usuario por ID
export const getUserByToken = async (req, res) => {
  try {
    const { id } = user.id
    const user = await User.findById(id)
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Verificar si quiere ver tu propio perfil
export const verifyMySelfProfile = async (req, res) => {
  try {
    const id = user.id
    const username = req.params.username;

    const user = await User.findById(id)
    const userCheck = await User.findOne(username)
    if (user?._id.toString() === userCheck?._id.toString()){
      res.json({verify: true})
    } else{
      res.json({verify: false})
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
} 


//Actualizar perfil de usuario
export const updateUserProfile = async (req, res) => {
  try {
    const { username, email, profilePic, bio } = req.body
    const user = await User.updateOne(
      { _id: req.params.id },
      { username, email, profilePic, bio }
    )
    res.status(201).json({ message: 'Usuario actualizada', user })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

//Actualizar contraseña de usuario
export const updateUserPassword = async (req, res) => {
  try {
    const { password } = req.body
    const hashed = await bcrypt.hash(password, 10)
    const user = await User.updateOne(
      { _id: req.params.id },
      { password: hashed }
    )
    res.status(201).json({ message: 'Contraseña actualizada', user })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

//Eliminar un usuario por ID
export const deleteUserByID = async (req, res) => {
  try {
    const user = await User.deleteOne({ _id: req.params.id })
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })
    res.status(200).json({ message: 'Usuario eliminado' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Obtener usuario por username
export const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params
    const user = await User.findOne({ username })
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: err.message })
  }
}
