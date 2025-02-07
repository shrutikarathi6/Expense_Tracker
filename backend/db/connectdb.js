import mongoose from "mongoose";

export const connectDb = async (req,res)=>{
    try {
        const conn = await mongoose.connect("mongodb+srv://shrutikarathi6:expense_tracker@cluster0.xrzuo.mongodb.net/")
       
        console.log(`mongodb connected : ${conn.connection.host}`)
        
    } catch (error) {
        console.log(error,"error in mongodb connection")
    }
}