# Personal Expense Visualizer

## 📌 Overview
Personal Expense Visualizer is a web application that helps users track their income and expenses efficiently. It provides a visual representation of financial data using bar charts and pie charts, making it easier to analyze spending patterns.

## 🎯 Features
- ✅ **Enter Monthly Salary**: Users can input their salary to manage their expenses.
- ✅ **Add, Edit & Delete Transactions**: Keep track of expenses by adding, modifying, or deleting them.
- ✅ **Expense Summary**: Displays total expenses and remaining balance.
- ✅ **Data Visualization**:
  - **Bar Chart**: Displays expense trends over time.
  - **Pie Chart**: Shows expense distribution across different categories.
- ✅ **Responsive UI**: Works seamlessly on desktop and mobile devices.

## 🛠️ Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Recharts
- **Backend**: Node.js, Express.js, MongoDB (for data storage)
- **API Handling**: Axios

## 🚀 Installation & Setup
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/personal-expense-visualizer.git
cd personal-expense-visualizer
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Start the Development Server
```bash
npm run dev
```

### 4️⃣ Set Up Backend (If Applicable)
Ensure that your backend is running on **http://localhost:8000** and properly connected to MongoDB.

## 📦 API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | /api/transactionsdetails | Fetch all transactions |
| POST | /api/transactions | Add a new transaction |
| PUT | /api/transactions/:id | Update a transaction |
| DELETE | /api/transactions/:id | Delete a transaction |
| DELETE | /api/transactions | Delete all transactions |

## 📊 Screenshots
(Add some screenshots of the UI here)



