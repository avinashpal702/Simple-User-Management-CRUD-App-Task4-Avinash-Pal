const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Temporary in‑memory database
let users = [
  { id: 1, name: "Avinash", email: "avinash@example.com" },
  { id: 2, name: "Rahul",   email: "rahul@example.com" }
];

// Home route
app.get("/", (req, res) => {
  res.json({ message: "Backend API is running" });
});

// GET all users
app.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

// GET single user
app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
});

// POST new user
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// DELETE user
app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const exists = users.some(u => u.id === id);
  if (!exists) {
    return res.status(404).json({ message: "User not found" });
  }
  users = users.filter(u => u.id !== id);
  res.status(200).json({ message: "User deleted successfully" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});