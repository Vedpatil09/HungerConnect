const express = require("express");
const router = express.Router();

const auth = require("../utils/authMiddleware");
const User = require("../models/user");
const Food = require("../models/food");
const Booking = require("../models/booking");

router.get("/profile", auth, async (req, res) => {

  try {

    const user = await User.findById(req.userId);

    const donationCount = await Food.countDocuments({
      donor: req.userId
    });

    const bookingCount = await Booking.countDocuments({
      ngo: req.userId
    });

    res.render("profile", {
      user,
      donationCount,
      bookingCount
    });

  } catch (err) {
    console.log(err);
    res.send("Error loading profile");
  }

});

module.exports = router;   // 🔥 THIS LINE IS VERY IMPORTANT