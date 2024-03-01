const express = require('express');
const { addBlog, getAllBlogs, deleteBlog, getBlog, updateBlog } = require('../Controllers/BlogsControllers');
const router = express.Router();

// Route for handling image uploads
router.post('/addblog', addBlog);
router.get("/allblogs", getAllBlogs);
router.delete("/allblogs/:id", deleteBlog);
router.put("/allblogs/:id", updateBlog);
router.get("/allblogs/:id", getBlog);

module.exports = router;
