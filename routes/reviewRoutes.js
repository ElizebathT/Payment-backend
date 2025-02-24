const express = require("express");
const reviewController = require("../controllers/reviewController");
const userAuthentication = require("../middlewares/userAuthentication");
express.json()
const reviewRouter = express.Router();

reviewRouter.post("/add", userAuthentication,reviewController.addReview);

reviewRouter.get("/get", userAuthentication,reviewController.getReviews);

reviewRouter.get("/filter", userAuthentication,reviewController.filterReviewsByCategory);

module.exports = reviewRouter;
