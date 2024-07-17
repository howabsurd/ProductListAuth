const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const router = require("./routes/user");
const cors = require("cors");

const app = express();

// Use CORS middleware
const allowedOrigins = ['https://product-list-frontend.vercel.app', "http://localhost:3000"];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));

app.use(express.json());

// Middleware to log requests
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Define routes
app.use("/api", router);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Mongoose database connected successfully`);
  })
  .catch((err) => {
    console.log(err);
  });

// Basic route
app.get("/", (req, res) => {
  res.status(200).json("Server is running");
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`App is listening on port ${process.env.PORT}`);
});
