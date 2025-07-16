const express = require("express");
const router = express.Router();

// POST /api/login
router.post("/login", (req, res) => {
  const { email } = req.body;

  if (!email || !email.endsWith("@cse.nits.ac.in")) {
    return res.status(401).json({ message: "Invalid email domain" });
  }

  // In a real app, generate a token here
  res.json({ message: "Login successful", email });
});

module.exports = router;
