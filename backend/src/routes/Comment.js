import express from 'express'
import { getCommentsByPost } from '../controllers/CommentController.js';
import { postComment } from '../controllers/CommentController.js';
import { verifyToken } from '../server.js'

export const CommentRouter = express.Router();

CommentRouter.post('/api/posts/comments', verifyToken, postComment)
CommentRouter.get('/api/posts/comments', verifyToken, getCommentsByPost)