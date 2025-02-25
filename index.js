require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./database/connectDB");
const cookieParser = require("cookie-parser")
const errorHandler = require("./middlewares/errorHandler")
const router = require("./routes");
const app = express();


connectDB()
const allowedOrigins = [                 
    "https://payment-frontend-ruby.vercel.app",
    "http://localhost:5000"
  ];
  
  app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('CORS not allowed for this origin'));
        }
    },
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
}));  

app.use(cookieParser())



app.use(router)


app.use(errorHandler)


app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));