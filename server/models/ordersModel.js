import mongoose from "mongoose";

const ordersModel = mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Users",
        },
        items: [Object],
    },
    {timestamps:true}
)

const OrdersModel = mongoose.model("orders",ordersModel)
export default OrdersModel