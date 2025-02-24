const express =require("express");
const stripeController = require("../controllers/stripeController");
const userAuthentication = require("../middlewares/userAuthentication");
const stripeRouter = express.Router();

stripeRouter.post("/checkout", stripeController.payment);
stripeRouter.get("/verify/:paymentId", stripeController.verify);

module.exports = stripeRouter;
