import express from 'express'
import { countLikes, toggleLike } from '../controllers/LikeController.js'

export const LikeRouter = express.Router()

// Dar o quitar like
LikeRouter.post('/api/:id/like', toggleLike)

// Contar los likes de un post
LikeRouter.get('/api/post/:postId/count', countLikes)
