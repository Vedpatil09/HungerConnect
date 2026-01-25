require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const Food = require("./models/food");

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
app.use("/", require("./routes/food"));
app.use("/", require("./routes/booking"));


app.get("/home", async (req, res) => {

  const foods = await Food.find()
    .sort({ createdAt: -1 });

  res.render("home", { foods });
});


  
// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});