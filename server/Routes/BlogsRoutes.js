const express = require('express');
const { addBlog, getAllBlogs, deleteBlog, getBlog, updateBlog, addReview, deleteReview } = require('../Controllers/BlogsControllers');
const { verifyJWT } = require('../MiddleWares/verifyJWT');
const router = express.Router();

// Route for handling image uploads
router.post('/addblog', addBlog);
router.get("/allblogs", getAllBlogs);
router.delete("/allblogs/:id", deleteBlog);
router.put("/allblogs/:id", updateBlog);
router.get("/allblogs/:id", getBlog);
router.post("/addreview/:id", addReview);
router.delete("/:blogId/:reviewId", deleteReview);

module.exports = router;
