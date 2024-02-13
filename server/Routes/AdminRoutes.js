const { verifyJWT } = require("../MiddleWares/verifyJWT");

const adminRouter = require("express").Router();


adminRouter.get("/verify", verifyJWT, (req, res) => {
    res.status(200).json({ message: "Authorized" })
})

module.exports = adminRouter;