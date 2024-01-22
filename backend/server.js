const express = require('express');
const colors = require('colors');
const employeeRoute=require('./routes/employeeRoute')
const connectDb = require('./config/db');
const uploadMiddleware = require("./middelware/upload");
const { handleFileUpload } = require("./controllers/employeeController");
const multer = require("multer");
const dotenv = require('dotenv')
const cors = require('cors')
const app = express();
dotenv.config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:3000' }));
const PORT = process.env.PORT || 5000;
connectDb()

app.use("/employees", employeeRoute);
// app.post("/upload", uploadMiddleware.single("photo"), handleFileUpload);

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).json({ error: "File upload error: " + err.message });
  } else {
    next(err);
  }
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.cyan);
});