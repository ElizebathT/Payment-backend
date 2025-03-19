const express=require("express");
const userRoutes = require("./userRouter");
const restaurantRoutes = require("./restaurantRouter");
const cartRouter = require("./cartRoutes");
const menuRouter = require("./menuRoutes");
const orderRouter = require("./orderRoutes");
const employeeRouter = require("./employeeRoutes");
const notifyRouter = require("./notificationRoutes");
const paymentRouter = require("./paymentRouter");
const stripeRouter = require("./stripeRoutes");
const reservationRouter = require("./reservationRoutes");
const adminRouter = require("./adminRoutes");
const deliveryRouter = require("./deliveryRoutes");
const reviewRouter = require("./reviewRoutes");
const complaintRouter = require("./complaintRoutes");
const attendanceRoute = require("./attendenceRoutes");
const router=express()

router.use("/stripe", stripeRouter);

router.use(express.json())

router.use("/admin", adminRouter);
router.use("/users", userRoutes);
router.use("/attendence", attendanceRoute);
router.use("/complaint", complaintRouter);
router.use("/delivery", deliveryRouter);
router.use("/restaurant", restaurantRoutes);
router.use("/restaurant", reviewRouter);
router.use("/menu", menuRouter);
router.use("/cart", cartRouter);
router.use("/order", orderRouter);
router.use("/employee", employeeRouter);
router.use("/notifications", notifyRouter);
router.use("/reservations", reservationRouter);
router.use("/payment", paymentRouter);


module.exports=router