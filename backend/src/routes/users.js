import { Router } from 'express'
import multer from 'multer'
import {
  register,
  login,
  deleteUserByID,
  updateUserProfile,
  updateUserPassword,
  getUserByUsername,
  getUserByToken,
  verifyMySelfProfile,
  getUsersFiltered
} from '../controllers/users.js'
import { verifyToken } from '../middlewares/verifyToken.js'

const upload = multer({ dest: 'public/avatars/' })

export const usersRouter = Router()

// Crear usuarios
usersRouter.post('/api/users', upload.single('avatar'), register)

// Login
usersRouter.post('/api/users/login', login)

// Conseguir tu propio perfil
usersRouter.get('/api/users/me', verifyToken, getUserByToken)

// Verificar si estas buscando tu propio perfil o no
usersRouter.get(
  'api/users/verifyMySelfProfile',
  verifyToken,
  verifyMySelfProfile
)

// Obtener usuario por ID
usersRouter.get('/api/users/me', verifyToken, getUserByToken)

// Actualizar perfil
usersRouter.put('/api/users/:id/profile', updateUserProfile)

// Actualizar contraseña (usa el ID del token, no el de la URL)
usersRouter.put('/api/users/password', updateUserPassword)

// Eliminar usuario
usersRouter.delete('/api/users/:id', deleteUserByID)

// Obtener un usuario por username
usersRouter.get('/api/users/:username', getUserByUsername)

usersRouter.get('/api/users/filter/:name', getUsersFiltered)
