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

const allowedOrigins = [
  "http://localhost:3000", // Local development
  "https://gurukrupa-kirana-frontend.vercel.app", // Vercel deployment
];


app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., mobile apps or Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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
