import mongoose  from "mongoose";


const transactionSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        amount:{
            type:Number,
            required:true
        }
    },{timestamps:true}
)

const transaction=mongoose.model("Transaction",transactionSchema);

export default transaction;