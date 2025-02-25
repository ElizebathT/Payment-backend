const Stripe = require("stripe");
const stripe=Stripe(process.env.STRIPE_SECRET_KEY)
const asyncHandler = require("express-async-handler");
require("dotenv").config()
// const Payment = require("../models/paymentModel");

const stripeController={
    // payment:asyncHandler(async(req,res)=>{
    //     try{
    //         const paymentIntent=await stripe.paymentIntents.create({
    //             amount:4000*100,
    //             currency:'usd',
    //             metadata:{
    //                 // userEmail:req.user.email,
    //             },
    //         })
    //         res.send({
    //             clientSecret:paymentIntent.client_secret
    //         })
    //     }catch(error){
    //         res.json({error})
    //     }
    // }),

    // webhook:asyncHandler(async(req,res)=>{
    //     const sig = req.headers['stripe-signature'];
    //     let event;
    //     try {
    //         event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_KEY);
    //     } catch (err) {
    //         console.log(err.message);
            
    //         return res.status(400).send(`Webhook Error: ${err.message}`);
    //     }
    //     if (event.type === 'payment_intent.succeeded') {
    //         res.status(200).send('💰 Payment succeeded!');
    //     }
    //     if (event.type === 'checkout.session.completed') {
    //         res.status(200).send('✅ Payment Completed:', event.data.object);
    //     }      
    //     res.status(200).send('Webhook set');  
    // })

    payment: asyncHandler(async (req, res) => {
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: 4000 * 100, // $40.00
                currency: 'usd',
                payment_method_types: ['card', 'google_pay', 'upi'], // ✅ Added Google Pay & UPI
                metadata: {
                    // userEmail: req.user?.email, // Optional metadata
                },
            });
            res.send({
                clientSecret: paymentIntent.client_secret,
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    
    webhook: asyncHandler(async (req, res) => {
        const sig = req.headers['stripe-signature'];
        let event;
        try {
            event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_KEY);
        } catch (err) {
            console.log('Webhook Error:', err.message);
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }
    
        // ✅ Handling different payment methods
        switch (event.type) {
            case 'payment_intent.succeeded':
                console.log('💰 Payment Succeeded:', event.data.object);
                break;
            case 'payment_intent.payment_failed':
                console.log('❌ Payment Failed:', event.data.object);
                break;
            case 'checkout.session.completed':
                console.log('✅ Checkout Session Completed:', event.data.object);
                break;
            default:
                console.log(`Unhandled event type: ${event.type}`);
        }
    
        res.status(200).send('Webhook received');
    })
    
}
module.exports=stripeController