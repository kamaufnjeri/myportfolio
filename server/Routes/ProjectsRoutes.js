const { addProject, getAllProjects, deleteProject, updateProject, getProject } = require('../Controllers/ProjectsControllers');
const { addTools, allTools, deleteTool, updateTool, getTool } = require('../Controllers/ToolsControllers');
const { verifyJWT } = require('../MiddleWares/verifyJWT');

const router = require('express').Router();

// api for tools
router.post("/addtool", verifyJWT, addTools);
router.get("/alltools", allTools);
router.delete("/alltools/:id", verifyJWT, deleteTool);
router.put("/alltools/:id", verifyJWT, updateTool);
router.get("/alltools/:id", getTool);


// apis for project
router.post("/addproject", verifyJWT, addProject);
router.get("/allprojects", getAllProjects);
router.delete("/allprojects/:id", verifyJWT, deleteProject);
router.put("/allprojects/:id", verifyJWT, updateProject);
router.get("/allprojects/:id", getProject);

module.exports = router;