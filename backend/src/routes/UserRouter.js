import { Router } from 'express'
import { register } from '../controllers/UserController.js'
import { login } from '../controllers/UserController.js'
import { deleteUserByID } from '../controllers/UserController.js'
import { updateUserProfile } from '../controllers/UserController.js'
import { updateUserPassword } from '../controllers/UserController.js'
import { getUserByUsername } from '../controllers/UserController.js'
import { verifyToken } from '../middlewares/verifyToken.js'
import { getUserByToken } from '../controllers/UserController.js'
import { verifyMySelfProfile } from '../controllers/UserController.js'
import {getUsersFiltered} from '../controllers/UserController.js'


// Crear usuario
userRouter.post('/api/users', register)

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
userRouter.get('/api/users/me', verifyToken, getUserByToken);

// Actualizar perfil
userRouter.put('/api/users/:id/profile', updateUserProfile)

// Actualizar contraseña (usa el ID del token, no el de la URL)
userRouter.put('/api/users/password', updateUserPassword)

// Eliminar usuario
userRouter.delete('/api/users/:id', deleteUserByID)

// Obtener un usuario por username
userRouter.get('/api/users/:username/profile', getUserByUsername)

userRouter.get('/api/users/filter/:name', getUsersFiltered)



export default userRouter
