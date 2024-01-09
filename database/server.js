const express = require("express");
const connectDb = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const employeeRoute= require("./routes/employee.js");

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "http://localhost:3000" }));
const PORT = process.env.PORT || 5000;
connectDb();

app.use("/database/employee", employeeRoute);

app.get("/", (req, res) => {
  res.send("Welcome to PMS");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
