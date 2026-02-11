const express = require("express");

const User = require("../models/user");
const Food = require("../models/food");
const Booking = require("../models/booking");

const auth = require("../utils/authMiddleware");

const router = express.Router();


// =======================
// PROFILE PAGE
// =======================
router.get("/", auth, async (req, res) => {

  try {

    // Get user info (without password)
    const user = await User
      .findById(req.userId)
      .select("-password");


    // Count donations
    const donations = await Food.countDocuments({
      donor: req.userId
    });


    // Count bookings
    const bookings = await Booking.countDocuments({
      user: req.userId
    });


    res.render("profile", {
      user,
      donations,
      bookings
    });

  } catch (err) {

    console.log(err);

    res.redirect("/home");

  }

});


module.exports = router;
