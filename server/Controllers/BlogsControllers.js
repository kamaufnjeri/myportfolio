const Blog = require('../Models/blogsModels');

// Function to retrieve all blogs from the database
// Function to add a new project to the database
module.exports.addBlog = async (req, res) => {
    try {
        // Extract project details from the request body
        const blogData = req.body;

        // check if project exists
        const blog = await Blog.findOne({ title: blogData.title });

        if (blog) {
            return res.status(200).json({ message: "Blog already exists"});
        }

        // Create a new project instance
        const newBlog = await Blog.create(blogData);

        // Return a 201 status with the newly created project data
        res.status(201).json({ message: "Blog added successfully", blog: newBlog });
    } catch (error) {
        // Return a 500 status with an error message if an error occurs
        console.error("Error adding blog:", error);
        res.status(500).json({ message: "Error adding blog", error: error.message });
    }
}

module.exports.getAllBlogs = async (req, res) => {
    try {
        // Fetch all projects from the database
        const blogs = await  Blog.find();

        // Check if projects were found
        if (blogs.length > 0) {
            // Return a 200 status with the blogs data
            res.status(200).json({ message: "Blogs found", blogs: blogs });
        } else {
            // Return a 200 status with an empty array if no blogs were found
            res.status(404).json({ message: "Blogs not found", blogs: [] });
        }
    } catch (error) {
        // Return a 500 status with an error message if an error occurs
        console.error("Error getting blogs:", error);
        res.status(500).json({ message: "Error getting blogs", error: error.message });
    }
}
// get a project by id
module.exports.getBlog = async (req, res) => {
    try {
        // Fetch all projects from the database
        const { id } = req.params;

        const blog = await Blog.findById(id);

        // Check if projects were found
        if (blog) {
            // Return a 200 status with the projects data
            res.status(200).json({ message: "Blog found", blog: blog });
        } else {
            // Return a 200 status with an empty array if no projects were found
            res.status(404).json({ message: "No such blog" });
        }
    } catch (error) {
        // Return a 500 status with an error message if an error occurs
        console.error("Error getting blog:", error);
        res.status(500).json({ message: "Error getting plog", error: error.message });
    }
}

// Function to delete a project from the database
module.exports.deleteBlog = async (req, res) => {
    try {
        // Get the project ID from the request parameters
        const { id } = req.params;

        // Find and delete the project by ID
        const deletedBlog = await Blog.findByIdAndDelete(id);

        // Check if the project was found and deleted
        if (!deletedBlog) {
            // Return a 404 status with an error message if the project was not found
            res.status(404).json({ message: "Blog not found" });
        } else {
            // Return a 200 status with a success message if the project was successfully deleted
            res.status(200).json({ message: "Blog deleted successfully" });
        }
    } catch (error) {
        // Return a 500 status with an error message if an error occurs
        console.error("Error deleting blog:", error);
        res.status(500).json({ message: "Error deleting blog", error: error.message });
    }
}

// Function to update a project in the database
module.exports.updateBlog = async (req, res) => {
    try {
        // Get the project ID from the request parameters
        const { id } = req.params;

        // Extract updated project details from the request body
        const updateData = req.body;

        // Find and update the project by ID, returning the updated project
        const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, { new: true });

        // Check if the project was found and updated
        if (!updatedBlog) {
            // Return a 404 status with an error message if the project was not found
            res.status(404).json({ message: "Blog not found" });
        } else {
            // Return a 200 status with the updated project data
            res.status(200).json({ message: "Blog updated successfully", blog: updatedBlog });
        }
    } catch (error) {
        // Return a 500 status with an error message if an error occurs
        console.error("Error updating blog:", error);
        res.status(500).json({ message: "Error updating blog", error: error });
    }
}
