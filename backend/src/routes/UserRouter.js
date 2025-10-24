import { Router } from 'express'
import { register } from '../controllers/UserController.js'
import { login } from '../controllers/UserController.js'
import { getUserByID } from '../controllers/UserController.js'
import { deleteUserByID } from '../controllers/UserController.js'
import { updateUserProfile } from '../controllers/UserController.js'
import { updateUserPassword } from '../controllers/UserController.js'
const userRouter = Router()

// 🔹 Crear un nuevo ususario
userRouter.post('/api/users/', register)

// 🔹 Login
userRouter.post('/api/users/login', login)

// 🔹 Obtener un usuario por ID
userRouter.get('/api/users', getUserByID)

// 🔹 Actualizar perfil de un usuario
userRouter.put('/api/users/:id/profile', updateUserProfile)

// 🔹 Actualizar contraseña de un usuario
userRouter.put('/api/users/:id/password', updateUserPassword)

// 🔹 Eliminar un usuario
userRouter.delete('/api/users/:id', deleteUserByID)

export default userRouter
