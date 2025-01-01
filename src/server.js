const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { addProductDataRoute } = require("./Routes/AddProductData");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse application/json
app.use(express.urlencoded({ extended: true})); // Parse application/x-www-form-urlencoded
app.use(
  cors({
    origin: ["http://localhost:3000"], // Frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Allow credentials (cookies, etc.)
  })
);

// Routes
app.use("/api/admin", addProductDataRoute);

// Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
