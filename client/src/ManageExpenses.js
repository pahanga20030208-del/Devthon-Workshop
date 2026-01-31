import { useEffect, useState } from "react";
import "./Manage.css";

function ManageExpenses() {
  const [expenses, setExpenses] = useState([]);

  const load = () => {
    fetch("http://localhost:5000/expenses")
      .then(res => res.json())
      .then(setExpenses);
  };

  useEffect(load, []);

  const remove = id => {
    fetch(`http://localhost:5000/expenses/${id}`, {
      method: "DELETE"
    }).then(load);
  };

  return (
    <div className="manage-container">
      <h1>Manage Expenses</h1>

      {expenses.map(exp => (
        <div className="expense-card" key={exp.id}>
          <div>
            <strong>{exp.title}</strong>
            <p>{exp.category} • {exp.paymentMethod}</p>
            <small>{exp.date}</small>
          </div>
          <div>
            <span>${exp.amount}</span>
            <button className="delete" onClick={() => remove(exp.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ManageExpenses;
