import { useEffect, useState } from "react";
import "./App.css";
import ManageExpenses from "./ManageExpenses";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState("add");

  const [loginData, setLoginData] = useState({ username: "", password: "" });

  const login = () => {
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData)
    })
      .then(res => {
        if (!res.ok) throw new Error();
        setLoggedIn(true);
      })
      .catch(() => alert("Invalid login"));
  };

  if (!loggedIn) {
    return (
      <div className="container">
        <h1>Admin Login</h1>
        <input
          placeholder="Username"
          onChange={e => setLoginData({ ...loginData, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={e => setLoginData({ ...loginData, password: e.target.value })}
        />
        <button onClick={login}>Login</button>
      </div>
    );
  }

  return (
    <>
      <nav className="nav">
        <button onClick={() => setPage("add")}>Add Expense</button>
        <button onClick={() => setPage("manage")}>Manage Expenses</button>
      </nav>

      {page === "add" ? <ExpenseForm /> : <ManageExpenses />}
    </>
  );
}

/* Expense Form Component */
function ExpenseForm() {
  const [data, setData] = useState({
    title: "",
    amount: "",
    category: "Food",
    paymentMethod: "Cash",
    date: "",
    notes: ""
  });

  const submit = () => {
  fetch("http://localhost:5000/expenses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(() => {
    alert("Expense added");
    setData({ title: "", amount: "", category: "Food", paymentMethod: "Cash", date: "", notes: "" });
  });
};

  return (
    <div className="container">
      <h1>Add Expense</h1>

      <input placeholder="Title" onChange={e => setData({ ...data, title: e.target.value })} />
      <input type="number" placeholder="Amount" onChange={e => setData({ ...data, amount: e.target.value })} />

      <select onChange={e => setData({ ...data, category: e.target.value })}>
        <option>Food</option>
        <option>Transport</option>
        <option>Bills</option>
        <option>Shopping</option>
      </select>

      <select onChange={e => setData({ ...data, paymentMethod: e.target.value })}>
        <option>Cash</option>
        <option>Card</option>
        <option>Online</option>
      </select>

      <input type="date" onChange={e => setData({ ...data, date: e.target.value })} />
      <textarea placeholder="Notes" onChange={e => setData({ ...data, notes: e.target.value })} />

      <button onClick={submit}>Add Expense</button>
    </div>
  );
}

export default App;
