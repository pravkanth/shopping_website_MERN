import mongoose from "mongoose";

const productModel = mongoose.Schema(
    {
        title:{
            type:String,
            required:[true,"Please add the title"]
        },
        price:{
            type:Number,
            required:[true,"Please add the price"]
        },
        category:{
            type:String,
            required:[true,"Please add the category"]
        },
        image:{
            type:String,
            required:[true,"Please add the image"]
        },
        rating:{
            type:Number,
            default: 0,
        },
        count:{
            type:Number,
            required:[true,"Please add the count"]
        }
    },
    {timestamps:true}
)

const ProductModel = mongoose.model("products",productModel)
export default ProductModel