require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes
app.use("/", require("./routes/auth"));
app.get("/home", (req, res) => {

  // Temporary dummy data
  const foods = [
    {
      title: "Fresh Vegetables Basket",
      description: "Tomatoes, carrots, cucumbers",
      location: "Mumbai",
      quantity: "5kg",
      status: "active",
      time: "2 hours ago",
      image: "https://source.unsplash.com/400x300/?vegetables"
    },

    {
      title: "Bakery Items",
      description: "Fresh bread & pastries",
      location: "Pune",
      quantity: "15 items",
      status: "completed",
      time: "1 hour ago",
      image: "https://source.unsplash.com/400x300/?bread"
    }
  ];

  res.render("home", { foods });
});

// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});