const express = require("express");
const Food = require("../models/food");
const Booking = require("../models/booking");
const auth = require("../utils/authMiddleware");

const router = express.Router();


// ==============================
// 📌 BOOK FOOD
// ==============================
router.post("/book/:foodId", auth, async (req, res) => {

  try {

    const food = await Food.findById(req.params.foodId);

    // If food not found
    if (!food) {
      return res.redirect("/home");
    }

    // Prevent booking own donation
    if (food.donor.toString() === req.userId) {
      return res.redirect("/home");
    }

    // Prevent booking if already booked
    if (food.status !== "active") {
      return res.redirect("/home");
    }

    // Prevent duplicate booking by same user
    const existingBooking = await Booking.findOne({
      food: food._id,
      ngo: req.userId
    });

    if (existingBooking) {
      return res.redirect("/home");
    }

    // Create booking
    await Booking.create({
      food: food._id,
      ngo: req.userId
    });

    // Update food status
    food.status = "booked";
    await food.save();

    res.redirect("/home");

  } catch (err) {
    console.log("Booking Error:", err);
    res.redirect("/home");
  }

});


// ==============================
// 📌 MY BOOKINGS PAGE
// ==============================
router.get("/bookings", auth, async (req, res) => {

  try {

    const bookings = await Booking.find({
      ngo: req.userId
    })
      .populate("food")        // populate food details
      .sort({ createdAt: -1 }); // latest first

    res.render("bookings", { bookings });

  } catch (err) {
    console.log("Fetch Bookings Error:", err);
    res.render("bookings", { bookings: [] });
  }

});


module.exports = router;
