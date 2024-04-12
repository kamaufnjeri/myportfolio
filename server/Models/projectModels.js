const mongoose = require('mongoose');

// Define schema for projects
const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    sourceCodeUrl: {
        type: String,
        required: true,
        unique: true,
    },
    websiteUrl: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    challenges: {
        type: String,
        default: '',
    },
    lessonsLearnt: {
        type: String,
        default: '',
    },
    toolsAndTechnologies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ToolTechnology'
    }]
});

// Create Projects model
const Project = mongoose.model('Project', projectSchema);

// Define schema for tools and technologies
const toolTechnologySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

// Create ToolTechnology model
const ToolTechnology = mongoose.model('ToolTechnology', toolTechnologySchema);

module.exports = { Project, ToolTechnology };
