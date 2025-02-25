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
const allowedOrigins = [                 // For local development
    "https://payment-frontend-ruby.vercel.app"   // For production
  ];
  
  const corsOption = {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow request
      } else {
        callback(new Error("Not allowed by CORS")); // Block request
      }
    },
    optionsSuccessStatus: 200,
    credentials: true
  };
  
app.use(cors(corsOption));

app.use(cookieParser())



app.use(router)


app.use(errorHandler)


app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));