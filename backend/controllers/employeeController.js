const Employee = require("../models/employeeModel.js");
const moment = require("moment");
const path = require("path");
const fs = require("fs");

// const uploadsFolder = path.join(__dirname, "uploads");

const handleFileUpload = async (req, employeeId) => {
  try {
    const employeeFolder = path.join(__dirname, 'uploads', employeeId);
    const destinationPath = path.join(employeeFolder, req.file.filename);

    if (!fs.existsSync(employeeFolder)) {
      fs.mkdirSync(employeeFolder, { recursive: true });
    }

    fs.renameSync(req.file.path, destinationPath);

    return destinationPath;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Error uploading file');
  }
};

const createEmployee = async (req, res) => {
  try {
    // Parse and format the birthday before saving
    const formData = req.body;
    formData.birthday = moment(formData.birthday, "DD/MM/YYYY").toISOString();

    // Check if photo is uploaded
    if (req.file) {
      console.log("photo"+req.file)
      formData.photo = await handleFileUpload(req, formData._id);
    }

    const newEmployee = new Employee(formData);
    await newEmployee.save();

    res.status(201).json({ message: "Employee saved successfully", newEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const formData = req.body;

    // Check if photo is uploaded
    if (req.file) {
      req.body.photo = await handleFileUpload(req, formData._id);
    }

    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    await employee.save();
    res.status(200).json({ message: "Employee updated successfully", employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


 const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    console.log("Fetched Data:", employee);
    res.status(200).json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
 const getAllEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    next(err);
  }
};

//  const updateEmployee = async (req, res) => {
//   try {
//     console.log('Updating employee')
//     const employee = await Employee.findByIdAndUpdate(
//       req.params.id,
//       { $set: req.body },
//       { new: true }
//     );
//     await employee.save();
//     res
//       .status(200)
//       .json({ message: "Employee updated successfully", employee });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

 const deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(
      req.params.id
    );
    if (!deletedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json({
      message: "Employee deleted successfully",
      deletedEmployee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployeeById,

};

