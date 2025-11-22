import express from 'express'
import { getCommentsByPost, postComment } from '../controllers/CommentController.js'
import { verifyToken } from '../middlewares/verifyToken.js'
export const CommentRouter = express.Router()

CommentRouter.post('/api/posts/:postId/comments', verifyToken, postComment)

CommentRouter.get('/api/posts/:postId/comments', getCommentsByPost)
