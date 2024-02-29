const { addProject, getAllProjects, deleteProject, updateProject, getProject } = require('../Controllers/ProjectsControllers');
const { addTools, allTools, deleteTool, updateTool, getTool } = require('../Controllers/ToolsControllers');

const router = require('express').Router();

// api for tools
router.post("/addtool", addTools);
router.get("/alltools", allTools);
router.delete("/alltools/:id", deleteTool);
router.put("/alltools/:id", updateTool);
router.get("/alltools/:id", getTool);


// apis for project
router.post("/addproject", addProject);
router.get("/allprojects", getAllProjects);
router.delete("/allprojects/:id", deleteProject);
router.put("/allprojects/:id", updateProject);
router.get("/allprojects/:id", getProject);

module.exports = router;