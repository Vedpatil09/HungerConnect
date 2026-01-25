const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  description: String,

  quantity: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  expiry: {
    type: Date,
    required: true
  },

  image: {
    type: String,
    default: "https://source.unsplash.com/400x300/?food"
  },

  status: {
    type: String,
    default: "active" // active, booked, collected
  },

  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Food", foodSchema);
