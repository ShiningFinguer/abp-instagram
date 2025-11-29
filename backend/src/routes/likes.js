import express from 'express'
import { countLikes, toggleLike, isLiked } from '../controllers/likes.js'
import { verifyToken } from '../middlewares/verifyToken.js'

export const likesRouter = express.Router()

// Dar o quitar like
likesRouter.post('/api/post/:postId/likes', verifyToken, toggleLike)

// Contar los likes de un post
likesRouter.get('/api/post/:postId/likes', countLikes)

// verificar si a dado like o no
likesRouter.get('/api/post/:postId/isliked', verifyToken, isLiked)
