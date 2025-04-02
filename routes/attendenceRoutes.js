const express = require("express");
const attendanceController = require("../controllers/attendenceController");
const attendanceRoute = express.Router();

attendanceRoute.post("/mark", attendanceController.markAttendance);
attendanceRoute.get("/view", attendanceController.getEmployeeAttendance);

module.exports = attendanceRoute;
