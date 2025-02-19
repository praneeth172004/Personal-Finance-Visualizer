import express from "express"
import {connectDB} from "./lib/db.js"
import tranactionsroutes from "./routes/transactions.routes.js"
import Transaction from "./models/transactions.model.js"
import cors from "cors"
const app=express();

app.use(express.json());


app.use(cors({
    origin :"http://localhost:5173"
}))
app.use("/api",tranactionsroutes)
app.delete("/api/transactions/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deletedTransaction = await Transaction.findByIdAndDelete(id);
  
      if (!deletedTransaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }
  
      res.json({ message: "Transaction deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting transaction" });
    }
  });

  // DELETE all transactions (Clear all data)
app.delete("/api/transactions", async (req, res) => {
    try {
      await Transaction.deleteMany({});
      res.json({ message: "All transactions deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting transactions" });
    }
  });
  app.put("/api/transactions/:id", async (req, res) => {
    const { id } = req.params;
    const { title, amount } = req.body;
    try {
      const updatedTransaction = await Transaction.findByIdAndUpdate(
        id,
        { title, amount },
        { new: true } // Ensure the updated document is returned
      );
      res.json(updatedTransaction);
    } catch (error) {
      res.status(500).json({ message: "Error updating transaction" });
    }
  });
  
app.listen(8000,()=>{
    console.log("Server at 8000");
    connectDB();
})