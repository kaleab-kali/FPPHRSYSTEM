const express = require('express');
const colors = require('colors');
const employeeRoute=require('./routes/employeeRoute')
const connectDb = require('./config/db');
const dotenv = require('dotenv')
const cors = require('cors')
const app = express();
dotenv.config()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: 'http://localhost:3000' }));
const PORT = process.env.PORT || 5000;
connectDb()

app.use("/backend/employees", employeeRoute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.cyan);
});