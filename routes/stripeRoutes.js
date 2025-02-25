const express =require("express");
const stripeController = require("../controllers/stripeController");
const userAuthentication = require("../middlewares/userAuthentication");
const stripeRouter = express.Router();

stripeRouter.post('/webhook', express.raw({ type: 'application/json' }), stripeController.webhook);
express.json()
stripeRouter.post("/checkout", stripeController.payment);

module.exports = stripeRouter;
