import { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function App() {
  const [salary, setSalary] = useState(""); // User salary
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]); // Expenses
  const [editingTransaction, setEditingTransaction] = useState(null); // Track editing transaction

  // Fetch transactions from the backend
  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/transactionsdetails"
      );
      setTransactions(response.data);
    } catch (error) {
      console.error(
        "Error fetching transactions:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Handle Add/Edit Transaction
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!salary) {
      alert("Please enter your salary before adding expenses.");
      return;
    }
    try {
      if (editingTransaction) {
        // If editing, update the transaction
        console.log(editingTransaction._id);
        
        await axios.put(
          `http://localhost:8000/api/transactions/${editingTransaction._id}`,
          {
            title,
            amount: Number(amount),
          }
        );
      } else {
        // If new transaction, add it
        await axios.post("http://localhost:8000/api/transactions", {
          title,
          amount: Number(amount),
        });
      }

      setTitle("");
      setAmount("");
      setEditingTransaction(null);
      fetchTransactions();
    } catch (error) {
      console.error(
        "Error saving transaction:",
        error.response?.data || error.message
      );
    }
  };

  // Handle Delete Transaction
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/transactions/${id}`);
      fetchTransactions();
    } catch (error) {
      console.error(
        "Error deleting transaction:",
        error.response?.data || error.message
      );
    }
  };

  // Handle Edit Transaction
  const handleEdit = (transaction) => {
    setTitle(transaction.title);
    setAmount(transaction.amount);
    setEditingTransaction(transaction);
  };
  // Handle Submit Salary
  const handleSubmitSalary = () => {
    fetchTransactions();
  };

  // Handle Clear Data (Clear salary & delete all transactions)
  const handleClearData = async () => {
    setSalary(""); // Clear salary state
    setTransactions([]); // Clear UI transactions

    try {
      await axios.delete("http://localhost:8000/api/transactions"); // Backend API to delete all transactions
    } catch (error) {
      console.error(
        "Error clearing data:",
        error.response?.data || error.message
      );
    }
  };

  // Calculate total expenses and remaining balance
  const totalExpenses = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const remainingBalance = salary ? salary - totalExpenses : 0;

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  return (
    <div className="min-h-screen flex flex-col items-center p-5 bg-gray-100">
      <div className="text-3xl font-bold mb-6 text-center">
        Personal Finance Visualizer
      </div>

      {/* Salary Input Section with Submit & Clear Buttons */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mb-6">
        <h2 className="text-xl font-bold mb-3">Enter Your Salary</h2>
        <input
          type="number"
          className="border rounded-xl w-full px-4 py-2 mb-3"
          placeholder="Enter your salary"
          value={salary}
          onChange={(e) => setSalary(Number(e.target.value))}
          required
        />
        <div className="flex gap-3">
          <button
            onClick={handleSubmitSalary}
            className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-xl hover:bg-blue-600 w-full"
          >
            Submit
          </button>
          <button
            onClick={handleClearData}
            className="bg-red-500 text-white font-semibold px-6 py-2 rounded-xl hover:bg-red-600 w-full"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Expense Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md w-full max-w-lg mb-6"
      >
        <h2 className="text-xl font-bold mb-3">
          {editingTransaction ? "Edit Expense" : "Add Expense"}
        </h2>

        <div className="w-full">
          <label className="text-lg font-semibold">Title</label>
          <input
            type="text"
            className="border rounded-xl w-full px-4 py-2 mt-2 mb-4"
            placeholder="Enter expense title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={!salary}
            required
          />
        </div>

        <div className="w-full">
          <label className="text-lg font-semibold">Amount</label>
          <input
            type="number"
            className="border rounded-xl w-full px-4 py-2 mt-2 mb-4"
            placeholder="Enter expense amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={!salary}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-xl mt-4 hover:bg-blue-600 w-full"
        >
          {editingTransaction ? "Update Expense" : "Add Expense"}
        </button>
      </form>

      {/* Summary */}
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold mb-3">Summary</h2>
        <div className="flex justify-between text-lg">
          <span>Total Expenses:</span>
          <span className="font-bold text-red-500">Rs.{totalExpenses}</span>
        </div>
        <div className="flex justify-between text-lg mt-2">
          <span>Remaining Balance:</span>
          <span
            className={`font-bold ${
              remainingBalance < 0 ? "text-red-600" : "text-green-600"
            }`}
          >
            Rs.{remainingBalance}
          </span>
        </div>
      </div>

      {/* Transactions List with Edit/Delete */}
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold mb-3">Your Transactions</h2>
        <ul className="space-y-3">
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <li
                key={transaction._id}
                className="flex justify-between items-center border-b pb-2"
              >
                <span>{transaction.title}</span>
                <span className="font-semibold">Rs.{transaction.amount}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(transaction)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(transaction._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No transactions available</p>
          )}
        </ul>
      </div>

      {/* Charts */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-white p-6 shadow-md rounded-lg w-full">
          <h3 className="text-xl font-bold mb-4 text-center">Expense Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={transactions}>
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 shadow-md rounded-lg w-full">
          <h3 className="text-xl font-bold mb-4 text-center">
            Expense Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={transactions}
                dataKey="amount"
                nameKey="title"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {transactions.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default App;
