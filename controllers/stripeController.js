const stripe=require("stripe")(process.env.STRIPE_SECRET_KEY)
const asyncHandler = require("express-async-handler");
require("dotenv").config()
// const Payment = require("../models/paymentModel");

const stripeController={
    payment:asyncHandler(async(req,res)=>{
        try{
            const paymentIntent=await stripe.paymentIntents.create({
                amount:4000*100,
                currency:'usd',
                metadata:{
                    // userEmail:req.user.email,
                },
            })
            res.send({
                clientSecret:paymentIntent.client_secret
            })
        }catch(error){
            res.json({error})
        }
    }),

    verify:asyncHandler(async(req,res)=>{
        const sig = req.headers['stripe-signature'];
        let event;
        try {
            event = stripe.webhooks.constructEvent(req.body, sig, "whsec_QB5yTbSHN4DBFZkyuDY0QMnGcsB7pC90");
        } catch (err) {
            console.log(err.message);
            
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }
        if (event.type === 'charge.succeeded') {
            res.status(200).send('💰 Payment succeeded!', event.data.object);
        }
        if (event.type === 'checkout.session.completed') {
            res.status(200).send('✅ Payment Completed:', event.data.object);
        }        
    })
}
module.exports=stripeController