const {
  createEmployee,
  getEmployeeById,
  deleteEmployee,
  updateEmployee,
  getAllEmployees
} = require( "../controllers/employee.js");
const express= require( "express");
const router = express.Router();

// Create a registration
router.post("/", createEmployee);

// // Get all Employee
router.get("/", getAllEmployees);

// // Get a specific Employee by ID
router.get("/:id", getEmployeeById);

// Update a Employee by ID
router.put("/:id", updateEmployee);

// // Delete a Employee by ID
router.delete("/:id", deleteEmployee);

module.exports = router;
