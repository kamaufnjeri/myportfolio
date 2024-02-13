const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config(); // Corrected: Added parentheses for function call

// verify decoded token
module.exports.verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(404).json({ message: "No token found"});
        }
        
        const decoded = jwt.verify(token, process.env.SECRETKEY);
        next();
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
}