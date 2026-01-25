const express = require("express");
const Food = require("../models/food");
const auth = require("../utils/authMiddleware");

const router = express.Router();

// Handle Donate Form
router.post("/donate", auth, async (req, res) => {

  try {

    const { title, description, quantity, location, expiry } = req.body;

    // Create food in DB
    await Food.create({
      title,
      description,
      quantity,
      location,
      expiry,
      donor: req.userId // from JWT
    });

    res.redirect("/home");

  } catch (err) {
    console.log(err);
    res.send("Something went wrong");
  }

});

module.exports = router;
