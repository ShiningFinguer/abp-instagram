import express from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { toggleFollow } from "../controllers/FollowController";
import { isFollowed } from "../controllers/FollowController";

export const FollowRouter = express.Router()

LikeRouter.post('/api/user/:user/follow', verifyToken, toggleFollow)

LikeRouter.get('/api/user/:user/follow', verifyToken, isFollowed)
