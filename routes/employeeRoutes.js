const express = require("express");
const employeeRouter = express.Router();
const employeeController = require("../controllers/employeeController");
const userAuthentication = require("../middlewares/userAuthentication");
express.json()

employeeRouter.get("/get",userAuthentication, employeeController.getEmployees);
employeeRouter.get("/search",userAuthentication, employeeController.getEmployeeById);
employeeRouter.put("/edit",userAuthentication, employeeController.updateEmployee);
employeeRouter.delete("/delete",userAuthentication, employeeController.deleteEmployee);

module.exports = employeeRouter;
