const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "food-donations",
    allowed_formats: ["jpg", "jpeg", "png", "webp"]
  }
});

// Multer upload middleware
const upload = multer({
  storage: storage
});

module.exports = upload;
