const express =require("express");
const stripeController = require("../controllers/stripeController");
const userAuthentication = require("../middlewares/userAuthentication");
const stripeRouter = express.Router();


// stripeRouter.get('/verify/:paymentId', stripeController.verify);
stripeRouter.get('/verify', express.raw({ type: 'application/json' }), stripeController.verify);
express.json()
stripeRouter.post("/checkout", stripeController.payment);

module.exports = stripeRouter;
