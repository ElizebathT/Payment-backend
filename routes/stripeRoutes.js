const express =require("express");
const stripeController = require("../controllers/stripeController");
const userAuthentication = require("../middlewares/userAuthentication");
const stripeRouter = express.Router();

stripeRouter.post("/checkout", stripeController.payment);
stripeRouter.get('/webhook', express.raw({ type: 'application/json' }), stripeController.verify);

module.exports = stripeRouter;
