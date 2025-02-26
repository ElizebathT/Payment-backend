const Stripe = require("stripe");
const stripe=Stripe(process.env.STRIPE_SECRET_KEY)
const asyncHandler = require("express-async-handler");
const Payment = require("../models/paymentModel");
require("dotenv").config()

const stripeController={
    payment:asyncHandler(async(req,res)=>{
        const {id,currency}=req.body
        const payment=await Payment.findById(id)
        try{
            const paymentIntent=await stripe.paymentIntents.create({
                amount:4000*100,
                currency:currency || payment.currency,
                metadata:{
                    // user:req.user.id,
                },
            })
            payment.reference= paymentIntent.id
            await payment.save();

            res.send({
                clientSecret:paymentIntent.client_secret
            })
        }catch(error){
            res.json({error})
        }
    }),

    webhook:asyncHandler(async(req,res)=>{
        const sig = req.headers['stripe-signature'];
        let event;
        try {
            event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_KEY);
        } catch (err) {
            console.log(err.message);
            
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }
        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntent = event.data.object;

                // Update the payment status in the database
                await Payment.findOneAndUpdate(
                    { reference: paymentIntent.id },
                    { status: 'succeeded' }
                );

                return res.status(200).send('💰 Payment succeeded!');

            case 'checkout.session.completed':
                const session = event.data.object;

                // Update the payment status in the database
                await Payment.findOneAndUpdate(
                    { reference: session.id },
                    { status: 'completed' }
                );

                return res.status(200).send('✅ Payment Completed');

            default:
                return res.status(200).send('Webhook received');
        }  
    })    
}
module.exports=stripeController