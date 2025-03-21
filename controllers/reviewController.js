const expree=require('express')
const Review = require("../models/reviewModel");
const Restaurant = require("../models/restaurantModel");
const asyncHandler=require("express-async-handler")

const serviceKeywords = ["staff", "waiter", "service", "friendly", "rude", "slow"];
const foodKeywords = ["delicious", "tasty", "flavor", "spicy", "cold", "fresh"];
const locationKeywords = ["parking", "view", "ambience", "environment", "noise", "crowded"];

const categorizeReview = (comment) => {
  let categories = [];
  const lowerComment = comment.toLowerCase();

  if (serviceKeywords.some(word => lowerComment.includes(word))) categories.push("service");
  if (foodKeywords.some(word => lowerComment.includes(word))) categories.push("food");
  if (locationKeywords.some(word => lowerComment.includes(word))) categories.push("location");

  return categories;
};

const reviewController={
addReview : asyncHandler(async (req, res) => {
    const { name,comment,rating } = req.body;
    const userId=req.user.id
    
    if (!comment) {
      return res.status(400).json({ error: "Review comment is required" });
    }
    
    const restaurantExist = await Restaurant.findOne({ name});
    if(!restaurantExist){
        res.send('Restaurant not found')
    }
    const restaurantId=restaurantExist._id
    const categories = categorizeReview(comment);


    const newReview = new Review({
      user: userId,
      restaurant: restaurantId,
      comment,
      rating,
      categories
    });

    await newReview.save();

    const complete=await Restaurant.findByIdAndUpdate(restaurantId, { $push: { reviews: newReview._id } });

    if(!complete){
        throw new Error( "Error adding review" );
    }
        res.send({ message: "Review added successfully", review: newReview });    
    }),

getReviews : asyncHandler(async (req, res) => {
    const { name } = req.body;
    const restaurantExist = await Restaurant.findOne({ name});
    if(!restaurantExist){
        res.send('Restaurant not found')
    }
    const restaurantId=restaurantExist._id
        const reviews = await Review.find({ restaurant: restaurantId }).populate("user", "name");
    if(!reviews){
        res.send('No reviews found')
    }
        res.send(reviews);
        
    }),

filterReviewsByCategory :asyncHandler(async (req, res) => {
        const { category } = req.body;
    
        if (!["service", "food"].includes(category)) {
            res.send("Invalid category");
        }
    
        const reviews = await Review.find({ categories: category }).populate('restaurant');
    
        const restaurantIds = reviews.map(review => review.restaurant._id);
    
        const restaurants = await Restaurant.find({ _id: { $in: restaurantIds } }).populate('reviews');
        res.send(restaurants)
    }),
    addMenuReview: asyncHandler(async (req, res) => {
        const { menuItemId, comment, rating } = req.body;
        const userId = req.user.id;
    
        if (!comment || !rating) {
          return res.status(400).json({ message: "Comment and rating are required" });
        }
    
        const menuItem = await MenuItem.findById(menuItemId);
        if (!menuItem) {
          return res.status(404).json({ message: "Menu item not found" });
        }
    
        const newReview = new MenuReview({
          user: userId,
          menuItem: menuItemId,
          comment,
          rating
        });
    
        await newReview.save();
    
        // Link review to the menu item
        await MenuItem.findByIdAndUpdate(menuItemId, { $push: { reviews: newReview._id } });
    
        res.status(201).json({ message: "Review added successfully", review: newReview });
      }),
    
      // Get reviews for a specific menu item
      getMenuReviews: asyncHandler(async (req, res) => {
        const { menuItemId } = req.params;
    
        const menuItem = await MenuItem.findById(menuItemId).populate({
          path: "reviews",
          populate: { path: "user", select: "name" }
        });
    
        if (!menuItem) {
          return res.status(404).json({ message: "Menu item not found" });
        }
    
        res.status(200).json(menuItem.reviews);
      }),
    
      // Delete a menu review (Admin or user who posted it)
      deleteMenuReview: asyncHandler(async (req, res) => {
        const { reviewId } = req.params;
        const userId = req.user.id;
    
        const review = await MenuReview.findById(reviewId);
        if (!review) {
          return res.status(404).json({ message: "Review not found" });
        }
    
        if (review.user.toString() !== userId.toString() && !req.user.isAdmin) {
          return res.status(403).json({ message: "Not authorized to delete this review" });
        }
    
        await MenuReview.findByIdAndDelete(reviewId);
    
        res.status(200).json({ message: "Review deleted successfully" });
      })
}

module.exports = reviewController
