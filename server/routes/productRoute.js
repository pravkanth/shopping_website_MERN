import express from "express"
import { getAllProducts,moveToCart,getCartProducts,updateQty,deleteCartProduct,emptyCart} from "../controllers/productController.js"
import {updateOrders,getAllOrders} from "../controllers/ordersController.js"
import protect from '../middleware/authMiddleware.js'

const productRouter = express.Router()

// GETTING ALL PRODUCTS
productRouter.get("/",getAllProducts)

// CART ROUTING
productRouter.get("/cart",protect,getCartProducts)
productRouter.put("/cart/:id",protect,moveToCart)
productRouter.put("/qty",protect,updateQty)
productRouter.put("/delete/:id",protect,deleteCartProduct)
productRouter.put("/emptycart",protect,emptyCart)

// ORDERS ROUTING
productRouter.put("/orders",protect,updateOrders)
productRouter.get("/orders",protect,getAllOrders)



export default productRouter