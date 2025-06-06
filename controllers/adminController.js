const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Restaurant = require("../models/restaurantModel");
const Order = require("../models/orderModel");
const MenuItem = require("../models/menuItemModel");
const { default: bcrypt } = require("bcryptjs");
const Employee = require("../models/employeeModel");

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

          // Delete a menu item
    deleteMenuItem: asyncHandler(async (req, res) => {
                  const { id } = req.body;
                  const menuItem = await MenuItem.findOne({ id });
                  if (!menuItem) {
                      throw new Error("Menu item not found");
                  }
                  await menuItem.deleteOne();
                  res.json({ message: "Menu item deleted successfully" });
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
    createEmployee:asyncHandler(async (req, res) => {
        const { username, email, password,jobTitle, department, dateHired, salary, manager, status, performanceReview } = req.body;
    
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            throw new Error("User already exists");
        }
    
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create the user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role:"employee"
        });
    
        if (!user) {
            throw new Error("User creation failed");
        }
    
        // Create the employee linked to the user
        const employee = new Employee({
            user: user._id, // Linking employee to the user
            jobTitle,
            department,
            dateHired,
            salary,
            manager,
            status,
            performanceReview,
        });
    
        await employee.save();
    
        res.status(201).json({ 
            message: "Employee created successfully", 
            employee,
            user: { id: user._id, email: user.email, role: user.role } 
        });
    }),

    deleteUser:asyncHandler(async (req, res) => {
        try {
            const { id } = req.body;
            const deletedUser = await User.findByIdAndDelete(id);    
            if (!deletedUser) {
                return res.status(404).json({ message: "User not found" });
            }    
            res.status(200).json({ message: "User deleted successfully", deletedUser });
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
}),
}
module.exports=adminController