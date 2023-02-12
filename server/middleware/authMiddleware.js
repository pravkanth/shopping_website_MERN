import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js"

const protect = asyncHandler(async(req, res, next) => {
   let token
   let temp = req.headers.authorization?req.headers.authorization:req.body.headers.authorization
   if (temp && temp.startsWith("Bearer")) {
      try {
         token = temp.split(" ")[1];
         const decoded = jwt.verify(token,process.env.JWT_SECRET)
         req.user = await UserModel.findById(decoded.id).select('-password')
         next()
      } catch (error) {
         console.log(error);
         res.status(401)
         throw new Error("Not Authorized")
      }
   }
   if(!token){
      res.status(401)
      throw new Error("No token")
   }
})

export default protect;