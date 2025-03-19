const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  checkIn: {
    type: String, // Use "HH:MM" format (store as string or Date if needed)
  },
  checkOut: {
    type: String, // Use "HH:MM" format
  },
  status: {
    type: String,
    enum: ["present", "absent", "leave"],
    required: true
  },
  totalHours: {
    type: Number, // Calculated based on check-in and check-out
  },
  notes: {
    type: String, // Optional notes (e.g., reason for absence)
  }
}, { timestamps: true });

const Attendance = mongoose.model("Attendance", AttendanceSchema);
module.exports = Attendance;
