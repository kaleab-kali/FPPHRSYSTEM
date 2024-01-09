const express = require('express');
const colors = require('colors');

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

// app.use('/api/users', require('./routes/userRoutes'))
app.get('/', (req, res) => {
    res.send("welcome to pms")
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.cyan);
});

const employeeRoute= require("./routes/employee.js");

app.use("/backend/employess", employeeRoute);