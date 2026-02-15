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
    default: "https://via.placeholder.com/400x300?text=No+Image"
  },

  status: {
    type: String,
    default: "active"
  },

  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  latitude: {
    type: Number,
    default: null
  },

  longitude: {
    type: Number,
    default: null
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
  aiSuggestion: {
  type: String,
  default: ""
}


});

module.exports = mongoose.model("Food", foodSchema);
