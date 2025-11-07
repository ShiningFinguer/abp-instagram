import express from 'express'
import { countLikes, toggleLike } from '../controllers/LikeController.js'
import { verifyToken } from '../middlewares/verifyToken.js'

export const LikeRouter = express.Router()

// Dar o quitar like
LikeRouter.post('/api/post/:postId/like', verifyToken, toggleLike)

// Contar los likes de un post
LikeRouter.get('/api/post/:postId/likes', countLikes)
