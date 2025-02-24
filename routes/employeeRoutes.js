const express = require("express");
const employeeRouter = express.Router();
const employeeController = require("../controllers/employeeController");
express.json()

employeeRouter.post("/create", employeeController.createEmployee);
employeeRouter.get("/get", employeeController.getEmployees);
employeeRouter.get("/search", employeeController.getEmployeeById);
employeeRouter.put("/edit", employeeController.updateEmployee);
employeeRouter.delete("/delete", employeeController.deleteEmployee);

module.exports = employeeRouter;
