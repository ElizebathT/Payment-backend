const stripe=require("stripe")(process.env.STRIPE_SECRET_KEY)
const asyncHandler = require("express-async-handler");
// const Payment = require("../models/paymentModel");
// const Stripe = require('stripe');
// require("dotenv").config()

// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const stripeController={
//     payment:asyncHandler(async(req,res)=>{
//         const { amount, currency } = req.body;

//         try {
//           const paymentIntent = await stripe.paymentIntents.create({
//             amount, // In smallest currency unit (e.g., cents)
//             currency,
//             payment_method_types: ['card', 'google_pay'],
//           });
      
//           res.send({
//             clientSecret: paymentIntent.client_secret,
//           });
//         } catch (error) {
//           res.status(400).send({ error: error.message });
//         }
// })
    payment:asyncHandler(async(req,res)=>{
        // const {subscriptionPlanId}=req.body
        // if(!mongoose.isValidObjectId(subscriptionPlanId)){
        //     return res.json({message:'Invalid subscription plan'})
        // }
        // const plan=await Plan.findB

        try{
            const paymentIntent=await stripe.paymentIntents.create({
                amount:500*100,
                currency:'usd',
                metadata:{
                    // userId:req.user.id,
                    userEmail:'abc@gmail.com',
                    // subscriptionPlanId
                },
            })
            res.send({
                clientSecret:paymentIntent.client_secret,
                // userEmail:'abc@gmail.com',
                // subscriptionPlanId
            })
        }catch(error){
            res.json({error})
        }
        }
    ),
    verify:asyncHandler(async(req,res)=>{
        // const {paymentId}=req.params
        // const paymentIntent=await stripe.paymentIntents.retrieve(paymentId)
        // console.log(paymentIntent);
        // if(paymentIntent.status!=='success'){
        //     const metadata=paymentIntent?.metadata
        //     // const subscriptionPlanId=metadata?.subscriptionPlanId
        //     // const userId=metadata.userId
        //     // const userFound=await User.findById(userId)
        //     // if(!userFound){
        //     //     throw new Error('User not found')
        //     // }
            // const amount=paymentIntent?.amount/100
            // const currency=paymentIntent?.currency
        //     // const newPayment=await Payment.create({
        //     //     user:userId,
        //     //     // subscriptionPlan:subscriptionPlanId,
        //     //     status:'success',
        //     //     amount,
        //     //     currency,
        //     //     reference:paymentId
        //     // })
        //     // if(newPayment){
        //     //     userFound.hasSelectedPlan=true
        //     //     userFound.plan=subscriptionPlanId
        //     //     await userFound.save()
        //     // }

        const sig = req.headers['stripe-signature'];
        let event;
        console.log("running");       

        try {
            event = stripe.webhooks.constructEvent(req.body, sig, "whsec_QB5yTbSHN4DBFZkyuDY0QMnGcsB7pC90");
        } catch (err) {
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        // Handle events
        if (event.type === 'payment_intent.succeeded') {
            console.log('💰 Payment succeeded!');
        }
        if (event.type === 'checkout.session.completed') {
            console.log('✅ Payment Completed:', event.data.object);
        }
        // res.json({ received: true });
        //     console.log('SUCCESS');
        //     res.json({
        //         status:true,
        //         message:'Payment verified, user updated',
        //         // userFound
        //     })
        // }
        
    })
}
module.exports=stripeController