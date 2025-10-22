import { Router } from 'express'
import { register } from '../controllers/UserController.js'
import { login } from '../controllers/UserController.js'

const userRouter = Router()

// 🔹 Obtener todos los usuarios
// userRouter.get('/', (req, res) => {
    
// })
// Login
userRouter.post('/login', login)

// 🔹 Obtener un usuario por ID
// userRouter.get('/api/users/:id', getCarById)

// 🔹 Crear un nuevo ususario
userRouter.post('/', register)

// 🔹 Actualizar un usuario existente
// userRouter.put('/api/users/:id', updateCar)

// 🔹 Eliminar un usuario
// userRouter.delete('/api/users/:id', deleteCar)

export default userRouter
