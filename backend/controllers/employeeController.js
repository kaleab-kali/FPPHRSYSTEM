const  Employee =require( "../models/employeeModel.js");

 const createEmployee = async (req, res) => {
  try {
    const formData = req.body;
    // Now formData should contain the values from the form
    console.log(formData);
    const newEmployee = new Employee({
      ...req.body
    });

    await newEmployee.save();

    res
      .status(201)
      .json({ message: "Employee saved successfully", newEmployee });
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

 const updateEmployee = async (req, res) => {
  try {
    console.log('Updating employee')
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    await employee.save();
    res
      .status(200)
      .json({ message: "Employee updated successfully", employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

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

