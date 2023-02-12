import asyncHandler from "express-async-handler"
import CartModel from "../models/cartModel.js"
import ProductModel from "../models/productModel.js"

export const getAllProducts = asyncHandler(async(req,res)=>{
    const products = await ProductModel.find()
    res.status(200).json(products)
})

export const moveToCart = asyncHandler(async(req,res)=>{
    const reqProductId = req.params.id;
    if(!reqProductId){
        res.status(400)
        throw new Error("No id found")
    }
    const product = await CartModel.find({user:req.user.id})
    if(product.length===0){
        const cartProduct = await CartModel.create(
            {
                user:req.user.id,
                items:[{productId:reqProductId,qty:1}],
            }
        )
        if(cartProduct){
            res.status(200).json(cartProduct)
        }
    }else{
        const productIdArr = product[0].items
        let found=0
        productIdArr.forEach(element => {
            if(element.productId === reqProductId){
                found=1
            }
        });
        if(found===1){
            res.status(200).json(product[0])
        }else{
            const newProduct = { productId:reqProductId, qty:1 }
            productIdArr.push(newProduct)
            const cartProduct = await CartModel.findByIdAndUpdate(product[0]._id,{...product,items:productIdArr},{new:true})
            res.status(200).json(cartProduct)
        }
    }
})

export const getCartProducts = asyncHandler(async(req,res)=>{
    const products = await CartModel.find({user:req.user.id})
    res.status(200).json(products[0])
})

export const updateQty = asyncHandler(async(req,res)=>{
    const {id,action} = req.body;
    if(!id || !action){
        res.status(400)
        throw new Error("ID or action required")
    }
    const cart = await CartModel.find({user:req.user.id})
    if(!cart){
        res.status(400)
        throw new Error("Cart not found")
    }
    let cartItem = cart[0].items
    cartItem.forEach((item)=>{
       if(item.productId === id){
            if(action === "add"){
                item.qty +=1
                return
            }else if(action ==="delete"){
                item.qty -=1
                return
            }
       }
    })
    const cartProduct = await CartModel.findByIdAndUpdate(cart[0]._id,{...cart,items:cartItem},{new:true})
    res.status(200).json(cartProduct)
})

export const deleteCartProduct = asyncHandler(async(req,res)=>{
    const productId = req.params.id
    if(!productId){
        res.status(400)
        throw new Error("ID not found")
    } 
    const cart = await CartModel.find({user:req.user.id})
    if(!cart){
        res.status(400)
        throw new Error("User not found")
    }
    let cartArr = []
    cart[0].items.forEach((item)=>{
        if(item.productId !== productId){
            cartArr.push(item)
        }
    })
    const cartProduct = await CartModel.findByIdAndUpdate(cart[0]._id,{...cart,items:cartArr},{new:true})
    res.status(200).json(cartProduct)
})

export const emptyCart = asyncHandler(async(req,res)=>{
    const cart = await CartModel.find({user:req.user.id})
    await CartModel.findByIdAndUpdate(cart[0]._id,{...cart,items:[]},{new:true})
    res.status(200).json([])
})
