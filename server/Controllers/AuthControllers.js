const UserModel = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Configure dotenv
dotenv.config();

const secretKey = process.env.SECRETKEY;
const maxAge = 24 * 60 * 60;

const createjwt = (user) => {
  try {
    return jwt.sign({ userId: user._id }, secretKey, { expiresIn: maxAge });
  } catch (error) {
    console.error("Error creating JWT token:", error);
    throw error;
  }
};

module.exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if user with password
    const checkUser = await UserModel.findOne({ email });

    if (checkUser) {
      return res.status(200).json({ message: "User already exists" });
    } else {
      // Create a new user
      const newUser = await UserModel.create({ email, password });

      // Create JWT token
      const token = createjwt(newUser);

      // Respond with success message
      res
        .status(201)
        .json({ message: `User logged in successfully`, user: newUser, token });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create user", error: error.message });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Create a new user
    const user = await UserModel.login(email, password);

    // Create JWT token
    const token = createjwt(user);

    // Respond with success message
    res.status(201).json({ message: "Login successful", user, token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to login user", error: error.message });
  }
};


