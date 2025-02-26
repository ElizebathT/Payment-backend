const express =require("express");
const paymentController = require("../controllers/paymentController");
const userAuthentication = require("../middlewares/userAuthentication");
express.json()
const paymentRouter = express.Router();

paymentRouter.get("/viewallr",userAuthentication, paymentController.getPayments);
paymentRouter.put("/edit",userAuthentication, paymentController.updatePaymentStatus);
paymentRouter.get("/search",userAuthentication, paymentController.getPaymentById);

module.exports = paymentRouter;
