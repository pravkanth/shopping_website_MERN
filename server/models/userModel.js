import mongoose from "mongoose";

const userModel = mongoose.Schema(
    {
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        userName:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        },
        profileImg:{
            type:String,
        }
    },{
        timestamps:true
    }
)

const UserModel = mongoose.model("Users",userModel)

export default UserModel