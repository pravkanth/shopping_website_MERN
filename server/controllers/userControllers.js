import asyncHandler from "express-async-handler"
import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import byscript from "bcryptjs"

export const registerUser = asyncHandler(async(req,res)=>{
    const {email,password,profileImg,userName,address} = req.body;

    if(!email|| !password || !userName || !address){
        res.status(401)
        throw new Error("Please add all the fields.")
    }
    const userEmail = await UserModel.findOne({email})
    if(userEmail){
        res.status(401)
        throw new Error("Email Already Exist.")
    }

    const salt = await byscript.genSalt(10)
    const hashPassword = await byscript.hash(password,salt)

    const newUser = await UserModel.create({
        email,password:hashPassword,profileImg,userName,address
    })
    if(newUser){
        res.status(200).json({
            _id:newUser.id,
            email:newUser.email,
            userName:newUser.userName,
            profileImg:newUser.profileImg,
            address:newUser.address,
            token:genToken(newUser.id)
        })
    } else{
        res.status(400)
        throw new Error("Invalid user data")
    }
})

export const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    console.log("Came");
    const user = await UserModel.findOne({email})
    if(!user){
        res.status(401)
        throw new Error("Email Not Exist.")
    }
    const isMatch = await byscript.compare(password,user.password)
    if(!isMatch){
        res.status(401)
        throw new Error("Password does not match.")
    }
    res.status(200).json({
        _id:user.id,
        email:user.email,
        userName:user.userName,
        profileImg:user.profileImg,
        address:user.address,
        token:genToken(user.id)
    })
})

export const getMe = asyncHandler(async(req,res)=>{
    const user = await UserModel.findById(req.user.id).select("-password")

    if(!user){
        res.status(401);
        throw new Error("User not found")
    }
    res.status(200).json(user)
})

const genToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"1d"}) 
}
