import express from 'express'
import { countLikes, toggleLike, isLiked } from '../controllers/LikeController.js'
import { verifyToken } from '../middlewares/verifyToken.js'

export const LikeRouter = express.Router()

// Dar o quitar like
LikeRouter.post('/api/post/:postId/likes', verifyToken, toggleLike)

// Contar los likes de un post
LikeRouter.get('/api/post/:postId/likes', countLikes)

// verificar si a dado like o no
LikeRouter.get('/api/post/:postId/isliked', verifyToken, isLiked)
