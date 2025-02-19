import mongoose from "mongoose";

export const connectDB=async()=>{
    try{
        const connect=await mongoose.connect("mongodb://127.0.0.1:27017/personal_finance")
        console.log("mongodb connected:",connect.connection.host);
    }catch(error){
        console.log("MongoDB connection error:", error);
    }
}