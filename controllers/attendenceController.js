const asyncHandler = require("express-async-handler");
const Attendance = require("../models/attendenceModel");

const attendanceController = {
  
  // Mark Attendance (Check-in)
  markAttendance: asyncHandler(async (req, res) => {
    const { employee, status, checkIn } = req.body;

    const newAttendance = await Attendance.create({
      employee,
      date: new Date(),
      status,
      checkIn,
    });

    res.status(201).json({ message: "Attendance marked successfully", newAttendance });
  }),

  // Check-out Employee
  checkOut: asyncHandler(async (req, res) => {
    const { attendanceId, checkOut } = req.body;

    const attendance = await Attendance.findById(attendanceId);
    if (!attendance) {
      res.status(404);
      throw new Error("Attendance record not found");
    }

    // Calculate total hours
    const totalHours = calculateTotalHours(attendance.checkIn, checkOut);

    attendance.checkOut = checkOut;
    attendance.totalHours = totalHours;
    await attendance.save();

    res.status(200).json({ message: "Check-out recorded", attendance });
  }),

  // Get Employee Attendance Records
  getEmployeeAttendance: asyncHandler(async (req, res) => {
    const { employeeId } = req.body;
    const records = await Attendance.find({ employee: employeeId }).sort({ date: -1 });

    res.status(200).json(records);
  }),
};

// Utility: Calculate Total Hours
const calculateTotalHours = (checkIn, checkOut) => {
  const [inHour, inMin] = checkIn.split(":").map(Number);
  const [outHour, outMin] = checkOut.split(":").map(Number);

  return ((outHour * 60 + outMin) - (inHour * 60 + inMin)) / 60; // Convert minutes to hours
};

module.exports = attendanceController;
