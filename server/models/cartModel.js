import mongoose from "mongoose";

const cartModel = mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Users",
        },
        items: [
            {
              productId: { type: String, required: true },
              qty: { type: Number, required: true },
            },
          ],
    },
    {timestamps:true}
)

const CartModel = mongoose.model("cart",cartModel)
export default CartModel