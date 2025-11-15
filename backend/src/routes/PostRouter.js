import { Router } from 'express'
import multer from 'multer'

import { postPost } from "../controllers/PostController.js";
import { getPostsById } from "../controllers/PostController.js";
import { updatePost } from "../controllers/PostController.js";
import { deletePost } from "../controllers/PostController.js";
import { getAllPost } from '../controllers/PostController.js';
import { getPostsByUsername } from '../controllers/PostController.js'

import { verifyToken } from '../middlewares/verifyToken.js'

export const postRouter = Router()

const upload = multer({ dest: 'public/uploads/' })

// Crear un nuevo post
postRouter.post('/api/users/post', verifyToken, upload.single('image'), postPost);

// Obtener todos los posts de todos los usuarios
postRouter.get('/api/post/', getAllPost);

// Obtener los posts de mi usuario 
postRouter.get('/api/post/me', verifyToken, getPostsById)

// Obtener los post de otro usuario
postRouter.get('/api/post/:username', getPostsByUsername)

// Update post
postRouter.put('/api/post/:id', verifyToken, updatePost);

// Delete post
postRouter.delete('/api/post/:id', verifyToken, deletePost);
