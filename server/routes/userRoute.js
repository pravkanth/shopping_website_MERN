import express from 'express'
import {registerUser,loginUser,getMe} from "../controllers/userControllers.js"
import protect from '../middleware/authMiddleware.js'

const userRouter = express.Router()

userRouter.post("/",registerUser)
userRouter.post("/login",loginUser)
userRouter.get("/getMe/",protect,getMe)

export default userRouter