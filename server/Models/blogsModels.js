const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    bannerUrl: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    reviews: [{
        reviewerName: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        date: { 
            type: Date,
            default: Date.now,
        }
    }, { timestamps: true }], // Timestamps for reviews array
}, { timestamps: true }); // Timestamps for the entire document

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
