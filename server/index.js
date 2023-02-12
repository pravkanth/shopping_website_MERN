import express from "express"
import * as dotenv from "dotenv"
import cors from "cors"

import userRouter from "./routes/userRoute.js"
import productRouter from "./routes/productRoute.js"
import db from "./config/db.js"
import {errorHandler} from "./middleware/errorHandler.js"

dotenv.config();
const app = express()
const PORT = process.env.PORT
db()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use("/api/user",userRouter)
app.use("/api/products",productRouter)

app.use(errorHandler)

app.listen(PORT || 5000,()=>{
    console.log(`Server is running on the PORT ${PORT}`);
})