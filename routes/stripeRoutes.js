const express =require("express");
const stripeController = require("../controllers/stripeController");
const userAuthentication = require("../middlewares/userAuthentication");
const stripeRouter = express.Router()

stripeRouter.post('/webhook', express.raw({ type: 'application/json' }), stripeController.webhook);

stripeRouter.post("/checkout",userAuthentication,express.json() ,stripeController.payment);

module.exports = stripeRouter;
