import express from 'express'
import { getCommentsByPost, postComment } from '../controllers/comments.js'
import { verifyToken } from '../middlewares/verifyToken.js'

export const commentsRouter = express.Router()

commentsRouter.post('/api/posts/:postId/comments', verifyToken, postComment)

commentsRouter.get('/api/posts/:postId/comments', getCommentsByPost)
