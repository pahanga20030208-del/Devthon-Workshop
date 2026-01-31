const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./database.db");

/* Create table */
db.run(`
  CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    amount REAL NOT NULL,
    category TEXT,
    paymentMethod TEXT,
    date TEXT,
    notes TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

/* ===== LOGIN (Simple Admin Auth) ===== */
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "admin123") {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

/* ===== GET EXPENSES ===== */
app.get("/expenses", (req, res) => {
  db.all(
    "SELECT * FROM expenses ORDER BY date DESC",
    [],
    (err, rows) => {
      if (err) return res.status(500).json(err);
      res.json(rows);
    }
  );
});

/* ===== ADD EXPENSE ===== */
app.post("/expenses", (req, res) => {
  const { title, amount, category, paymentMethod, date, notes } = req.body;

  db.run(
    `INSERT INTO expenses (title, amount, category, paymentMethod, date, notes)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [title, amount, category, paymentMethod, date, notes],
    () => res.sendStatus(201)
  );
});

/* ===== DELETE EXPENSE ===== */
app.delete("/expenses/:id", (req, res) => {
  db.run(
    "DELETE FROM expenses WHERE id = ?",
    [req.params.id],
    () => res.sendStatus(200)
  );
});

/* Start server */
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
