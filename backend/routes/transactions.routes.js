import express from "express"
import { transactionData, transactionsdetails } from "../controllers/transactions.controller.js";

const route=express.Router();


route.post("/transactions",transactionData)
route.get("/transactionsdetails",transactionsdetails)
export default route;