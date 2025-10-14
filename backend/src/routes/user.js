const userRouter = require('express').Router()

// 🔹 Obtener todos los usuarios
userRouter.get('/users', getCars)

// 🔹 Obtener un usuario por ID
userRouter.get('/users/:id', getCarById)

// 🔹 Crear un nuevo ususario
userRouter.post('/users', createCar)

// 🔹 Actualizar un usuario existente
userRouter.put('/users/:id', updateCar)

// 🔹 Eliminar un usuario
userRouter.delete('/users/:id', deleteCar)

module.exports = userRouter
