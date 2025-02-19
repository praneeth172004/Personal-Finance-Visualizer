import Transaction from "../models/transactions.model.js";

export const transactionData = async (req, res) => {
    const { title, amount } = req.body;

    console.log("Data:", title);
    console.log("Amount:", amount);

    try {
     
        if (!title) {
            return res.status(400).json({ message: "Data is missing" });
        }
        if (!amount) {
            return res.status(400).json({ message: "Amount is missing" });
        }
        const newTransaction = new Transaction({
            title,
            amount,
        });

        await newTransaction.save();
        return res.status(201).json({
            id: newTransaction._id,
            title: newTransaction.title,
            amount: newTransaction.amount,
        });

    } catch (error) {
        console.error("Error in transactionData controller:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
export const transactionsdetails=async(req,res)=>{
    try {
        const transactions = await Transaction.find(); 
        res.json(transactions);
      } catch (error) {
        res.status(500).json({ message: "Error fetching transactions", error: error.message });
      }
}