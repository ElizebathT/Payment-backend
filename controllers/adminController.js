const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Restaurant = require("../models/restaurantModel");
const Order = require("../models/orderModel");
const MenuItem = require("../models/menuItemModel");

const adminController={
    getDashboardData :asyncHandler(async (req, res) => {
          const userCount = await User.find();
          const restaurantCount = await Restaurant.find();
          const orderCount = await Order.find();
      
          const dashboard = {
            userCount,
            restaurantCount,
            orderCount,
          };
      
          res.send(dashboard);
        
      }),
      
    verifyUser:asyncHandler(async (req, res) => {
        const {email}=req.body
        const user= await User.findOne({email})
        if(!user){
            throw new Error('User not found')
        }
        user.verified=true
        await user.save()
        res.send("User verified")
    }),
    updateMenuItemStock: asyncHandler(async (req, res) => {
        const { name, stock } = req.body;
        
        const menuItem = await MenuItem.findOne({ name });
        if (!menuItem) {
            throw new Error("Menu item not found");
        }
        
        menuItem.stock = stock;
        const updatedMenuItem = await menuItem.save();
        if(menuItem.stock>0)
        {
            menuItem.availability=true
        }
        res.send({
            message: "Stock updated successfully",
            menuItem: updatedMenuItem
        });
    })
}
module.exports=adminController