import asyncHandler from "express-async-handler"
import ordersModel from "../models/ordersModel.js"

export const getAllOrders = asyncHandler(async(req,res)=>{
    const products = await ordersModel.find({user:req.user.id})
    res.status(200).json(products)
})

export const updateOrders = asyncHandler(async(req,res)=>{
    const ordersData = req.body
    if(!ordersData){
        res.status(400)
        throw new Error("Orders Data not found")
    }
    const product = await ordersModel.find({user:req.user.id})
    if(!product){
        res.status(400)
        throw new Error("Product not found")
    }
    if(product.length===0){
        const orderProduct = await ordersModel.create({user:req.user.id,items:ordersData})
        if(orderProduct){
            res.status(200).json(orderProduct)
        }
    }
    else{
        const productIdArr = product[0].items
        ordersData.forEach(element => {
            productIdArr.push(element)
        });
        const orderProduct = await ordersModel.findByIdAndUpdate(product[0]._id,{...product,items:productIdArr},{new:true})
        res.status(200).json(orderProduct)
    }
})
