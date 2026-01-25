const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

  food: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Food"
  },

  ngo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  status: {
    type: String,
    default: "requested" // requested, approved, collected
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Booking", bookingSchema);
