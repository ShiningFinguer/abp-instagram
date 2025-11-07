import { Router } from 'express'
import { postPost } from '../controllers/PostController.js'
import { getUserPost } from '../controllers/PostController.js'
import { updatePost } from '../controllers/PostController.js'
import { deletePost } from '../controllers/PostController.js'
import { getAllPost } from '../controllers/PostController.js'
import { verifyToken } from '../middlewares/authMiddleware.js'

export const postRouter = Router()

// Obtener todos los posts
postRouter.get('/api/post', getAllPost)

// Crear un nuevo post
postRouter.post('/api/post/:id', postPost)

// Obtener todos los post del user
postRouter.get('/api/post/me', verifyToken, getUserPost)

// Update post
postRouter.put('/api/post/', updatePost)

// Delete post
postRouter.delete('/api/post/', deletePost)
