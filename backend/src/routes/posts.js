import { Router } from 'express'
import multer from 'multer'
import { postPost, getPostsById, updatePost, deletePost, getAllPost, getPostsByUsername } from '../controllers/posts.js'
import { verifyToken } from '../middlewares/verifyToken.js'

export const postsRouter = Router()

const upload = multer({ dest: 'public/uploads/' })

// Crear un nuevo post
postsRouter.post('/api/users/post', verifyToken, upload.single('image'), postPost)

// Obtener todos los posts de todos los usuarios
postsRouter.get('/api/post/', getAllPost)

// Obtener los posts de mi usuario
postsRouter.get('/api/post/me', verifyToken, getPostsById)

// Obtener los post de otro usuario
postsRouter.get('/api/post/:username', getPostsByUsername)

// Update post
postsRouter.put('/api/post/:id', verifyToken, updatePost)

// Delete post
postsRouter.delete('/api/post/:id', verifyToken, deletePost)
