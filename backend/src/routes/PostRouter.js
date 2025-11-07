import { Router } from 'express'
import { postPost } from "../controllers/PostController.js";
import { getUserPost } from "../controllers/PostController.js";
import { updatePost } from "../controllers/PostController.js";
import { deletePost } from "../controllers/PostController.js";
import { getPost } from '../controllers/PostController.js';
import { verifyToken } from '../middlewares/verifyToken.js'
export const postRouter = Router()
// Crear un nuevo post
postRouter.post('/api/users/posts', verifyToken, postPost);

postRouter.get('/api/post/', getPost);

// Obtener todos los post del user
postRouter.get('/api/post/:id', verifyToken, getUserPost);

// Update post
postRouter.put('/api/post/', verifyToken, updatePost);

// Delete post
postRouter.delete('/api/post/', verifyToken, deletePost);
