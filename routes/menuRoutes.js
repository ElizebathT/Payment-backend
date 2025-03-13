const express = require("express");
const menuController = require("../controllers/menuController");
const userAuthentication = require("../middlewares/userAuthentication");
const menuRouter = express.Router();
express.json()



menuRouter.get("/viewall", userAuthentication,menuController.getAllMenuItems);

menuRouter.get("/search",userAuthentication, menuController.getMenuItemById);
menuRouter.get("/filter",userAuthentication, menuController.filterMenuItems);

menuRouter.put("/edit",userAuthentication, menuController.updateMenuItem);


module.exports = menuRouter;
