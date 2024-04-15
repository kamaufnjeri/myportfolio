// Require express, dontenv and cors
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./Routes/AuthRoutes');
const cookieParser = require("cookie-parser");
const adminRouter = require('./Routes/AdminRoutes');
const projectsRouter = require("./Routes/ProjectsRoutes");
const uploadRouter = require("./Routes/UploadRoutes");
const blogRouter = require("./Routes/BlogsRoutes");
const contactMeRouter = require("./Routes/ContactMeRoutes");
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
console.log(FRONTEND_URL)
const MONGODB_URL = process.env.MONGODB_URL;
// connect to database
console.log(MONGODB_URL);
mongoose
.connect(MONGODB_URL, {
  dbName: 'portfolio',
})
.then(() => {
  console.log("Db connection successfull");
})
.catch((err) => {
  console.log("Error connecting to db " + err);
})
// Allow requests from http://localhost:3000
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));


//allow json, cookie parser
app.use(express.json());
app.use(cookieParser());
app.use("/", authRoutes)
app.use("/auth", adminRouter);
app.use("/projects", projectsRouter);
app.use("/images", uploadRouter);
app.use("/blogs", blogRouter);
app.use("/contactme", contactMeRouter);
// Start the server

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
