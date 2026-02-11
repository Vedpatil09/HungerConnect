const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");


// Create Router
const router = express.Router();


// =======================
// SHOW LOGIN PAGE
// =======================
router.get("/", (req, res) => {
  res.render("login");
});


// =======================
// SHOW REGISTER PAGE
// =======================
router.get("/register", (req, res) => {
  res.render("register");
});


// =======================
// HANDLE REGISTER
// =======================
router.post("/register", async (req, res) => {

  try {

    const { name, email, password } = req.body;


    // Check if user exists
    const exist = await User.findOne({ email });

    if (exist) {
      return res.redirect("/?error=User already exists");
    }


    // Hash password
    const hashed = await bcrypt.hash(password, 10);


    await User.create({
      name,
      email,
      password: hashed
    });


    res.redirect("/");

  } catch (err) {

    console.log(err);

    res.redirect("/?error=Register failed");

  }

});


// =======================
// HANDLE LOGIN (JWT + COOKIE)
// =======================
router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;


    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        error: "User not found"
      });
    }


    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.json({
        success: false,
        error: "Wrong password"
      });
    }


    // Create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );


    // Save token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax"
    });


    res.json({ success: true });


  } catch (err) {

    console.log("Login Error:", err);

    res.status(500).json({
      success: false,
      error: "Server error"
    });

  }

});


// =======================
// LOGOUT
// =======================
router.get("/logout", (req, res) => {

  res.clearCookie("token");

  res.redirect("/");

});


// Export router
module.exports = router;
