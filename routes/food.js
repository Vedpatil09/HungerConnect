const express = require("express");
const Food = require("../models/food");
const auth = require("../utils/authMiddleware");
const getAISuggestion = require("../utils/gemini");

const router = express.Router();
const upload = require("../utils/multer");


// Handle Donate Form
router.post("/donate", auth, upload.single("image"), async (req, res) => {


  try {

    const {
      title,
      description,
      quantity,
      location,
      expiry,
      latitude,
      longitude
    } = req.body;

 console.log("Uploaded file:", req.file);
    // Get AI recommendation from Gemini
    const aiText = await getAISuggestion({
      title,
      description,
      quantity,
      expiry
    });


    // Save food in DB
    await Food.create({

      title,
      description,
      quantity,
      location,
      expiry,

      latitude,
      longitude,

      donor: req.userId,
      image: req.file ? req.file.path : undefined,
      aiSuggestion: aiText

    });

    res.redirect("/home");

  } catch (err) {

    console.error("Donate Error:", err);

    res.send("Something went wrong while donating food.");

  }

});

module.exports = router;
