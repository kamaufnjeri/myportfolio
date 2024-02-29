// routes.js
const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

// Multer configuration for handling multipart/form-data
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

// Route for handling image uploads
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    // Upload image to Cloudinary
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await cloudinary.uploader.upload(dataURI, { folder: 'blog_images' });

    // Return the URL of the uploaded image
    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

module.exports = router;
