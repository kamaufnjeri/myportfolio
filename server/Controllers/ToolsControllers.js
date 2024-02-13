const { ToolTechnology } = require("../Models/projectModels");

// Function to add tools or technologies to the database
module.exports.addTools = async (req, res) => {
    try {
        // Extract the tool name from the request body
        const { name } = req.body;

        // Check if the tool already exists in the database
        const tool = await ToolTechnology.findOne({ name });

        // If the tool already exists, return a 200 status with a message
        if (tool) {
            return res.status(200).json({ message: "The tool already exists" });
        }

        // If the tool doesn't exist, create a new one and return a 201 status with the new tool data
        const newTool = await ToolTechnology.create({ name });
        res.status(201).json({ message: "Tool added successfully", tool: newTool });
    } catch (error) {
        // If an error occurs, log it and return a 500 status with an error message
        console.error("Error adding tool:", error);
        res.status(500).json({ message: "Error adding tool", error: error.message });
    }
}

// Function to get all tools
module.exports.allTools = async (req, res) => {
    try {
        // Retrieve all tools from the database
        const tools = await ToolTechnology.find();

        // If tools are found, return a 200 status with the tools data
        if (tools.length > 0) {
            return res.status(200).json({ message: "Data found", tools: tools });
        }

        // If no tools are found, return a 200 status with an empty array
        res.status(200).json({ message: "No data found", tools: [] });
    } catch (error) {
        // If an error occurs, log it and return a 500 status with an error message
        console.error("Error getting data:", error);
        res.status(500).json({ message: "Error getting data", error: error.message });
    }
}

// Function to delete a tool
module.exports.deleteTool = async (req, res) => {
    try {
        // Extract the tool ID from the request parameters
        const { id } = req.params;

        // Attempt to find and delete the tool by its ID
        const deleteTool = await ToolTechnology.findByIdAndDelete(id);

        // If the tool doesn't exist, return a 404 status with a message
        if (!deleteTool) {
            return res.status(404).json({ message: "Tool not found" });
        }

        // If the tool is successfully deleted, return a 200 status with a success message
        res.status(200).json({ message: "Tool successfully deleted" });
    } catch (error) {
        // If an error occurs, log it and return a 500 status with an error message
        console.error("Error deleting tool:", error);
        res.status(500).json({ message: "Error deleting tool", error: error.message });
    }
}

// Function to update a tool
module.exports.updateTool = async (req, res) => {
    try {
        // Extract the tool ID from the request parameters and the update data from the request body
        const { id } = req.params;
        const update = req.body;

        // Attempt to find and update the tool by its ID
        const updatedTool = await ToolTechnology.findByIdAndUpdate(id, update, { new: true });

        // If the tool doesn't exist, return a 404 status with a message
        if (!updatedTool) {
            return res.status(404).json({ message: "Tool not found" });
        }

        // If the tool is successfully updated, return a 200 status with the updated tool data
        res.status(200).json({ message: "Tool successfully updated", tool: updatedTool });
    } catch (error) {
        // If an error occurs, log it and return a 500 status with an error message
        console.error("Error updating tool:", error);
        res.status(500).json({ message: "Error updating tool", error: error.message });
    }
}
