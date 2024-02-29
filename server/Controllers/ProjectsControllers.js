const { Project } = require("../Models/projectModels");

// Function to add a new project to the database
module.exports.addProject = async (req, res) => {
    try {
        // Extract project details from the request body
        const projectData = req.body;

        // check if project exists
        const project = await Project.findOne({ title: projectData.title });

        if (project) {
            return res.status(200).json({ message: "Project already exists"});
        }

        // Create a new project instance
        const newProject = await Project.create(projectData);

        // Return a 201 status with the newly created project data
        res.status(201).json({ message: "Project added successfully", project: newProject });
    } catch (error) {
        // Return a 500 status with an error message if an error occurs
        console.error("Error adding project:", error);
        res.status(500).json({ message: "Error adding project", error: error.message });
    }
}

// Function to retrieve all projects from the database
module.exports.getAllProjects = async (req, res) => {
    try {
        // Fetch all projects from the database
        const projects = await Project.find();

        // Check if projects were found
        if (projects.length > 0) {
            // Return a 200 status with the projects data
            res.status(200).json({ message: "Projects found", projects: projects });
        } else {
            // Return a 200 status with an empty array if no projects were found
            res.status(404).json({ message: "No projects found", projects: [] });
        }
    } catch (error) {
        // Return a 500 status with an error message if an error occurs
        console.error("Error getting projects:", error);
        res.status(500).json({ message: "Error getting projects", error: error.message });
    }
}

// get a project by id
module.exports.getProject = async (req, res) => {
    try {
        // Fetch all projects from the database
        const { id } = req.params;

        const project = await Project.findById(id);

        // Check if projects were found
        if (project) {
            // Return a 200 status with the projects data
            res.status(200).json({ message: "Project found", project: project });
        } else {
            // Return a 200 status with an empty array if no projects were found
            res.status(404).json({ message: "No such project" });
        }
    } catch (error) {
        // Return a 500 status with an error message if an error occurs
        console.error("Error getting projects:", error);
        res.status(500).json({ message: "Error getting projects", error: error.message });
    }
}

// Function to delete a project from the database
module.exports.deleteProject = async (req, res) => {
    try {
        // Get the project ID from the request parameters
        const { id } = req.params;

        // Find and delete the project by ID
        const deletedProject = await Project.findByIdAndDelete(id);

        // Check if the project was found and deleted
        if (!deletedProject) {
            // Return a 404 status with an error message if the project was not found
            res.status(404).json({ message: "Project not found" });
        } else {
            // Return a 200 status with a success message if the project was successfully deleted
            res.status(200).json({ message: "Project deleted successfully" });
        }
    } catch (error) {
        // Return a 500 status with an error message if an error occurs
        console.error("Error deleting project:", error);
        res.status(500).json({ message: "Error deleting project", error: error.message });
    }
}

// Function to update a project in the database
module.exports.updateProject = async (req, res) => {
    try {
        // Get the project ID from the request parameters
        const { id } = req.params;

        // Extract updated project details from the request body
        const updateData = req.body;

        // Find and update the project by ID, returning the updated project
        const updatedProject = await Project.findByIdAndUpdate(id, updateData, { new: true });

        // Check if the project was found and updated
        if (!updatedProject) {
            // Return a 404 status with an error message if the project was not found
            res.status(404).json({ message: "Project not found" });
        } else {
            // Return a 200 status with the updated project data
            res.status(200).json({ message: "Project updated successfully", project: updatedProject });
        }
    } catch (error) {
        // Return a 500 status with an error message if an error occurs
        console.error("Error updating project:", error);
        res.status(500).json({ message: "Error updating project", error: error });
    }
}
