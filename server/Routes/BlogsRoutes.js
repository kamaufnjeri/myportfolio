const express = require('express');
const multer = require('multer');
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
const dotenv = require('dotenv');
const Blog = require("../Models/blogsModels")
const cloudinary = require('cloudinary').v2;

dotenv.config();

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

// Route for handling image uploads
router.post('/addblog', upload.single('banner'), async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await cloudinary.uploader.upload(dataURI, { folder: 'blog_images' });
        const { title, content } = req.body;
        
        try {
            const blog = await Blog.findOne({ title });

            if (blog) {
                res.status(200).json({ message: 'Blog Title Already Exists' });
            }
            const newBlog = await Blog.create({ title, content, bannerUrl: result.secure_url })
            res.status(201).json({ message: 'Blog Added successfully' });
        } catch (error) {
            console.error('Error Adding Blog:', error);
            res.status(500).json({ error: 'Failed to Add Blog' });
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
});

module.exports = router;
