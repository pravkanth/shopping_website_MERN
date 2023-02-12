import mongoose from "mongoose"
const db = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(conn.connection.host);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}
export default db