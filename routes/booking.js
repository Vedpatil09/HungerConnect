const express = require("express");
const Food = require("../models/food");
const Booking = require("../models/booking");
const auth = require("../utils/authMiddleware");

const router = express.Router();

// Book food
router.post("/book/:foodId", auth, async (req, res) => {

  const food = await Food.findById(req.params.foodId);

  if (!food || food.status !== "active") {
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
});

// My bookings
router.get("/bookings", auth, async (req, res) => {

  const bookings = await Booking.find({ ngo: req.userId })
    .populate("food");

  res.render("bookings", { bookings });
});

module.exports = router;
