const express =require("express");
const stripeController = require("../controllers/stripeController");
const userAuthentication = require("../middlewares/userAuthentication");
const stripeRouter = express.Router();

stripeRouter.post("/checkout", stripeController.payment);
// stripeRouter.get('/verify/:paymentId', stripeController.verify);
stripeRouter.get('/verify', express.raw({ type: 'application/json' }), stripeController.verify);

module.exports = stripeRouter;
