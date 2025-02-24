const express = require("express");
const menuController = require("../controllers/menuController");
const userAuthentication = require("../middlewares/userAuthentication");
const  upload  = require("../middlewares/cloudinary");
const menuRouter = express.Router();
express.json()

menuRouter.post("/add", userAuthentication,upload.single("image"),menuController.createMenuItem);

menuRouter.get("/viewall", userAuthentication,menuController.getAllMenuItems);

menuRouter.get("/search",userAuthentication, menuController.getMenuItemById);
menuRouter.get("/filter",userAuthentication, menuController.filterMenuItems);

menuRouter.put("/edit",userAuthentication, menuController.updateMenuItem);

menuRouter.delete("/delete", userAuthentication,menuController.deleteMenuItem);

module.exports = menuRouter;
