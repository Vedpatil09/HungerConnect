const express = require("express");
const Food = require("../models/food");
const auth = require("../utils/authMiddleware");

const router = express.Router();


// My Donations Page
router.get("/my-donations", auth, async (req, res) => {

  // Get only my food
  const foods = await Food.find({
    donor: req.userId
  }).sort({ createdAt: -1 });

  res.render("myDonations", { foods });

});

module.exports = router;
