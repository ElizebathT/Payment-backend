const asyncHandler = require("express-async-handler");
const MenuItem = require("../models/menuItemModel");

const menuController = {
    // Create a new menu item
    createMenuItem: asyncHandler(async (req, res) => {
        const { name, description, price, stock, category, availability, discount, addons, dietaryRestrictions } = req.body;
        
        // Create new menu item
        const newItem = await MenuItem.create({
            name,
            description,
            stock,
            price,
            image:req.files, // Assuming image is handled in the request files
            category,
            availability: availability || true, 
            discount: discount || { percentage: 0, validUntil: null },
            addons: addons || [],  // Add-ons field
            dietaryRestrictions: dietaryRestrictions || []  // Dietary restrictions field
        });
        
        if (!newItem) {
            throw new Error("Creation failed");
        }
        
        res.send({
            message: "New menu item added successfully",
            menuItem: newItem
        });
    }),

    // Get all menu items
    getAllMenuItems: asyncHandler(async (req, res) => {
        const menuItems = await MenuItem.find();
        res.json(menuItems);
    }),

    // Get a single menu item by name
    getMenuItemById: asyncHandler(async (req, res) => {
        const { name } = req.body;
        const menuItem = await MenuItem.findOne({ name });
        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }
        res.json(menuItem);
    }),

    // Update a menu item
    updateMenuItem: asyncHandler(async (req, res) => {
        const { name, description, price, stock, category, availability, discount, addons, dietaryRestrictions } = req.body;
        const menuItem = await MenuItem.findOne({ name });
        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }
        
        menuItem.name = name || menuItem.name;
        menuItem.description = description || menuItem.description;
        menuItem.price = price || menuItem.price;
        menuItem.stock = stock || menuItem.stock;
        menuItem.category = category || menuItem.category;
        menuItem.availability = availability !== undefined ? availability : menuItem.availability;
        menuItem.discount = discount || menuItem.discount;
        menuItem.addons = addons || menuItem.addons;  // Update add-ons
        menuItem.dietaryRestrictions = dietaryRestrictions || menuItem.dietaryRestrictions;  // Update dietary restrictions
        
        const updatedMenuItem = await menuItem.save();
        res.send({
            message: "Menu item updated successfully",
            menuItem: updatedMenuItem
        });
    }),

    // Delete a menu item
    deleteMenuItem: asyncHandler(async (req, res) => {
        const { name } = req.body;
        const menuItem = await MenuItem.findOne({ name });
        if (!menuItem) {
            throw new Error("Menu item not found");
        }
        await menuItem.deleteOne();
        res.json({ message: "Menu item deleted successfully" });
    }),

    // Filter menu items by category, price range, and other options
    filterMenuItems: asyncHandler(async (req, res) => {
        const { category, priceMin, priceMax, dietaryRestrictions, addons } = req.body;
        let filterQuery = {};

        if (category) {
            filterQuery.category = category;
        }
        if (priceMin || priceMax) {
            filterQuery.price = {};
            if (priceMin) filterQuery.price.$gte = priceMin;
            if (priceMax) filterQuery.price.$lte = priceMax;
        }
        if (dietaryRestrictions && dietaryRestrictions.length > 0) {
            filterQuery.dietaryRestrictions = { $in: dietaryRestrictions }; // Match any of the specified dietary restrictions
        }
        if (addons && addons.length > 0) {
            filterQuery.addons = { $in: addons }; // Match any of the specified add-ons
        }

        const filteredMenuItems = await MenuItem.find(filterQuery);
        if (!filteredMenuItems.length) {
            res.send({ message: "No menu items found matching your criteria" });
        }

        res.send({ menuItems: filteredMenuItems });
    })
};

module.exports = menuController;
