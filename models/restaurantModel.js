const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
    name: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
    location: String,
    cuisine: [String],
    contact: String,
    menu: [{ type: mongoose.Schema.Types.ObjectId, ref: "Menu" }],
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    deliveryAvailable: Boolean,
    ratings: Number,
}, { timestamps: true });

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
module.exports = Restaurant;