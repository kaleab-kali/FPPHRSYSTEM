const express = require('express');
const router = express.Router();
const uploadMiddleware = require("../middelware/upload");

const { createEmployee,
     getAllEmployees, 
     getEmployeeById, 
     updateEmployee,
     deleteEmployee } = require('../controllers/employeeController');



// const protect = require('../middleware/userMiddleware')
// Create a registration
router.post("/",uploadMiddleware.single("photo"), createEmployee);
// app.post("/upload", uploadMiddleware.single("photo"), handleFileUpload);

// Get all Employee
router.get("/", getAllEmployees);

// Get a specific Employee by ID
router.get("/:id", getEmployeeById);

// Update a Employee by ID
router.put("/:id", updateEmployee);

// Delete a Employee by ID
router.delete("/:id", deleteEmployee
);


module.exports = router;