import express from 'express'
import { verifyToken } from '../middlewares/verifyToken.js'
import {
  toggleFollow,
  isFollowed,
  getFollowCounts,
  getFollowersCount,
  getFollowingCount
} from '../controllers/follows.js'

export const followsRouter = express.Router()

followsRouter.post('/api/users/:userToFollow/follow', verifyToken, toggleFollow)

followsRouter.get('/api/users/:userToFollow/follow', verifyToken, isFollowed)

// public endpoint to get follower/following counts for a username
followsRouter.get('/api/users/:user/follow/counts', getFollowCounts)

// separate public endpoints for followers and following counts
followsRouter.get('/api/users/:user/followers/count', getFollowersCount)

followsRouter.get('/api/users/:user/following/count', getFollowingCount)
