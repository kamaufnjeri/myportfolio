const express = require('express');
const { addBlog, getAllBlogs, deleteBlog, getBlog, updateBlog, addReview, deleteReview } = require('../Controllers/BlogsControllers');
const { verifyJWT } = require('../MiddleWares/verifyJWT');
const router = express.Router();

// Route for handling image uploads
router.post('/addblog', verifyJWT, addBlog);
router.get("/allblogs", getAllBlogs);
router.delete("/allblogs/:id", verifyJWT, deleteBlog);
router.put("/allblogs/:id", verifyJWT, updateBlog);
router.get("/allblogs/:id", getBlog);
router.post("/addreview/:id", addReview);
router.delete("/:blogId/:reviewId", verifyJWT, deleteReview);

module.exports = router;
