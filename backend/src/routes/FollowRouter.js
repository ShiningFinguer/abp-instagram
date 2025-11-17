import express from 'express'
import { verifyToken } from '../middlewares/verifyToken.js'
import { toggleFollow } from '../controllers/FollowController.js'
import { isFollowed, getFollowCounts, getFollowersCount, getFollowingCount } from '../controllers/FollowController.js'

export const FollowRouter = express.Router()

FollowRouter.post('/api/users/:userToFollow/follow', verifyToken, toggleFollow)

FollowRouter.get('/api/users/:userToFollow/follow', verifyToken, isFollowed)

// public endpoint to get follower/following counts for a username
FollowRouter.get('/api/users/:user/follow/counts', getFollowCounts)

// separate public endpoints for followers and following counts
FollowRouter.get('/api/users/:user/followers/count', getFollowersCount)
FollowRouter.get('/api/users/:user/following/count', getFollowingCount)
