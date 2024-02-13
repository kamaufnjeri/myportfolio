// Require express, dontenv and cors
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/AuthRoutes');
const cookieParser = require("cookie-parser");
const adminRouter = require('./Routes/AdminRoutes');
const projectsRouter = require("./Routes/ProjectsRoutes");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
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
  console.log("Error connecting to db" + err);
})
// Allow requests from http://localhost:3000
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

//allow json, cookie parser
app.use(express.json());
app.use(cookieParser());
app.use("/", authRoutes)
app.use("/auth", adminRouter);
app.use("/projects", projectsRouter);


// Start the server

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
