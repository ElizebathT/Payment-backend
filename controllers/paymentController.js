// const Razorpay = require("razorpay");
// const crypto = require("crypto");
// const dotenv = require("dotenv");

// require("dotenv").config();

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // Create Order
// const paymentController={
// createOrder : async (req, res) => {
//     console.log("Clicked");
    
//   try {
//     const { amount, currency = "INR" } = req.body;

//     const options = {
//       amount: amount * 100, // Convert to paise
//       currency,
//       receipt: `receipt_${Date.now()}`,
//     };

//     const order = await razorpay.orders.create(options);
//     res.json(order);
//   } catch (error) {
//     res.status(500).json({ error: "Error creating Razorpay order" });
//   }
// },

// // Verify Payment
// verifyPayment : async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//     const body = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body)
//       .digest("hex");

//     if (expectedSignature === razorpay_signature) {
//       res.json({ success: true, message: "Payment verified successfully" });
//     } else {
//       res.status(400).json({ error: "Invalid signature, payment verification failed" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Error verifying payment" });
//   }
// }
// }
// module.exports=paymentController
