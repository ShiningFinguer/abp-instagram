import { Router } from 'express'
import multer from 'multer'
import { register, login, deleteUserByID, updateUserProfile, updateUserPassword, getUserByUsername, getUserByToken, verifyMySelfProfile, getUsersFiltered } from '../controllers/UserController.js'
import { verifyToken } from '../middlewares/verifyToken.js'

export const postRouter = Router()

const upload = multer({ dest: 'public/avatars/' })

const userRouter = Router()

// Crear usuario
userRouter.post('/api/users', upload.single('avatar'), register)

// Login
userRouter.post('/api/users/login', login)

// Conseguir tu propio perfil
userRouter.get('/api/users/me', verifyToken, getUserByToken)

// Verificar si estas buscando tu propio perfil o no
userRouter.get(
  'api/users/verifyMySelfProfile',
  verifyToken,
  verifyMySelfProfile
)

// Obtener usuario por ID
userRouter.get('/api/users/me', verifyToken, getUserByToken)

// Actualizar perfil
userRouter.put('/api/users/:id/profile', updateUserProfile)

// Actualizar contraseña (usa el ID del token, no el de la URL)
userRouter.put('/api/users/password', updateUserPassword)

// Eliminar usuario
userRouter.delete('/api/users/:id', deleteUserByID)

// Obtener un usuario por username
userRouter.get('/api/users/:username', getUserByUsername)

userRouter.get('/api/users/filter/:name', getUsersFiltered)

export default userRouter
