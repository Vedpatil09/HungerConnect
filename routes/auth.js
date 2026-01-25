const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

// Show register page
router.get("/register", (req, res) => {
  res.render("register");
});

// Show login page
router.get("/", (req, res) => {
  // Pass the error message from the URL to the EJS page
  res.render("login", { error: req.query.error });
});


// Handle Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Hash password for security
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user in DB
  await User.create({
    name,
    email,
    password: hashedPassword
  });

  res.redirect("/");
});

// Handle Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // If user does not exist
  if (!user) {
    return res.redirect("/?error=User not found. Please Create Account First.");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.redirect("/?error=Wrong password.");
  }

  // JWT creation logic (same as before)
  const token = jwt.sign(
    { id: user._id, roles: user.roles },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("token", token, { httpOnly: true });
  res.redirect("/dashboard");
});

router.get("/select-role", (req, res) => {
  res.render("selectRole");
});
module.exports = router;
