const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

let balance = 1000000000000;
let transactions = [];

app.get("/", (req, res) => {
  res.send("HABAB GARM BACKEND - DEMO");
});

app.get("/api/balance", (req, res) => {
  res.json({
    success: true,
    balance: balance,
    currency: "IRR",
    mode: "DEMO"
  });
});

app.get("/api/transfers", (req, res) => {
  res.json({
    success: true,
    transactions: transactions
  });
});

app.post("/api/transfer", (req, res) => {
  const { destinationCard, amount } = req.body;

  if (!destinationCard || !amount) {
    return res.status(400).json({
      success: false,
      message: "اطلاعات ناقص است."
    });
  }

  const value = Number(amount);

  if (!Number.isFinite(value) || value <= 0) {
    return res.status(400).json({
      success: false,
      message: "مبلغ نامعتبر است."
    });
  }

  if (value > balance) {
    return res.status(400).json({
      success: false,
      message: "موجودی کافی نیست."
    });
  }

  const transaction = {
    id: "HB-" + Date.now(),
    destinationCard: destinationCard,
    amount: value,
    status: "PENDING",
    createdAt: new Date().toISOString()
  };

  transactions.unshift(transaction);
  balance -= value;

  res.json({
    success: true,
    message: "انتقال آزمایشی ثبت شد.",
    transaction: transaction
  });
});

app.listen(PORT, () => {
  console.log("HABAB GARM SERVER RUNNING ON PORT " + PORT);
});
