const Employee = require("../models/employeeModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const employeeController={
// Create a new employee
    createEmployee :asyncHandler(async (req, res) => {
    const { user, jobTitle, department, dateHired, salary, manager, status, performanceReview } = req.body;

    // Check if the user exists
    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }

    // Create the employee
    const employee = new Employee({
      user,
      jobTitle,
      department,
      dateHired,
      salary,
      manager,
      status,
      performanceReview,
    });

    await employee.save();
    res.status(201).json({ message: "Employee created successfully", employee });
}),

    getEmployees :asyncHandler(async (req, res) => {
    const employees = await Employee.find()
      .populate("user", "username email role")  // Populate user details
      .populate("manager", "jobTitle username")  // Populate manager details
      .select("-__v");  // Exclude unnecessary fields
    res.send(employees);
}),

// Get an employee by ID
    getEmployeeById :asyncHandler(async (req, res) => {
    const { id } = req.params;
    const employee = await Employee.findById(id)
      .populate("user", "username email role")
      .populate("manager", "jobTitle username");

    if (!employee) {
      throw new Error("Employee not found");
    }
    res.send(employee);
}),

// Update employee details
updateEmployee :asyncHandler( async (req, res) => {
  try {
    const { id } = req.params;
    const { jobTitle, department, dateHired, salary, manager, status, performanceReview } = req.body;

    const employee = await Employee.findByIdAndUpdate(
      id,
      {
        jobTitle,
        department,
        dateHired,
        salary,
        manager,
        status,
        performanceReview,
      },
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee updated successfully", employee });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}),

// Delete an employee
 deleteEmployee :asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findByIdAndDelete(id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
})
}
module.exports=employeeController
