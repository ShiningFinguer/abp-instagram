import { Router } from 'express';
import {
  register,
  login,
  getUsers,
  getUserByID,
  deleteUserByID,
  updateUserProfile,
  updateUserPassword
} from '../controllers/UserController.js';

const userRouter = Router();

// Crear usuario
userRouter.post('/api/users', register);

// Login
userRouter.post('/api/users/login', login);

// Obtener todos los usuarios
userRouter.get('/api/users', getUsers);

// Obtener usuario por ID
userRouter.get('/api/users/:id', getUserByID);

// Actualizar perfil
userRouter.put('/api/users/:id/profile', updateUserProfile);

// Actualizar contraseña (usa el ID del token, no el de la URL)
userRouter.put('/api/users/password', updateUserPassword);

// Eliminar usuario
userRouter.delete('/api/users/:id', deleteUserByID);

export default userRouter;
