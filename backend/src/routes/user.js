import { Router } from 'express'

const userRouter = Router()

// 🔹 Obtener todos los usuarios
userRouter.get('/api/users', getCars)

// 🔹 Obtener un usuario por ID
userRouter.get('/api/users/:id', getCarById)

// 🔹 Crear un nuevo ususario
userRouter.post('/api/users', createCar)

// 🔹 Actualizar un usuario existente
userRouter.put('/api/users/:id', updateCar)

// 🔹 Eliminar un usuario
userRouter.delete('/api/users/:id', deleteCar)

export default userRouter
