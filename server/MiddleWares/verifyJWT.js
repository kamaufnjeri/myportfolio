const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config(); // Corrected: Added parentheses for function call

// verify decoded token
module.exports.verifyJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(404).json({ message: "No token found" });
    }

    const decoded = jwt.verify(token, process.env.SECRETKEY);
    next();
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

