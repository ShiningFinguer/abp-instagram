import express from 'express'
import { verifyToken } from '../middlewares/verifyToken.js'
import { toggleFollow } from '../controllers/FollowController.js'
import { isFollowed } from '../controllers/FollowController.js'

export const FollowRouter = express.Router()

FollowRouter.post('/api/users/:userToFollow/follow', verifyToken, toggleFollow)

FollowRouter.get('/api/users/:userToFollow/follow', verifyToken, isFollowed)
