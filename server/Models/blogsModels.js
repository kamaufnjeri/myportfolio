const mongoose = require('mongoose');

// schema for blogs i will create
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique,
    },
    content: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    views: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
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
    }]
});

const Blog = mongoose.model('Blog', blogSchema);


//export blog
module.exports = Blog;
