const asyncHandler = require("express-async-handler");
const Attendance = require("../models/attendenceModel");
const Employee = require("../models/employeeModel");

const attendanceController = {
  
  // Mark Attendance (Check-in)
  markAttendance: asyncHandler(async (req, res) => {
    const { employee, status } = req.body;
    const employeeExists = await Employee.findById(employee);
    const newAttendance = await Attendance.create({
      employee,
      date: new Date(),
      status,
    });
    employeeExists.attendance.push(newAttendance._id);
    await employeeExists.save();
    res.status(201).json({ message: "Attendance marked successfully", newAttendance });
  }),

  
  // Get Employee Attendance Records
  getEmployeeAttendance: asyncHandler(async (req, res) => {
    const { employeeId } = req.body;
    const records = await Attendance.find({ employee: employeeId }).sort({ date: -1 });

    res.status(200).json(records);
  }),
};

module.exports = attendanceController;
