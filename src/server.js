const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); 
const client= require("../redisConfig")
const { addProductDataRoute } = require("./Routes/AddProductData");
const { userRegisterRoute, registerUserRoute } = require("./Routes/AddUser");
const { getProductDataRoute } = require("./Routes/GetProductData");
const { getProductByIDRoute } = require("./Routes/GetProductByID");
const { cartRoute } = require("./Routes/AddToCart");
const { getCartDataRoute } = require("./Routes/GetCartData");
const { getUserDataRoute } = require("./Routes/GetUserData");
const { saveMyOrderRouter } = require("./Routes/SaveOrderRoute");
const { getMyOrderRoute } = require("./Routes/GetMyOrder.JS");
const { deleteCartItemRoute } = require("./Routes/delteCartItem"); 
const { saveUserDataRoute } = require("./Routes/UpdateUser");
const { getTotalOrderRoute } = require("./Routes/GetTotalOrder");
const { categoryDataRoute } = require("./Routes/CategoryData");
const { getOrderDetailRoute } = require("./Routes/GetOrderDetail");
const { generateOTPRoute } = require("./Routes/GenerateOTPController");
const { updateRouter, updateProductRouter } = require("./Routes/UpdateProductData");
const { deleteProductRoute } = require("./Routes/DeleteProductRouter");



dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse application/json
app.use(express.urlencoded({ extended: true})); // Parse application/x-www-form-urlencoded

const allowedOrigins = [
  "http://localhost:3000", // Local development
  "https://gurukrupa-kirana-frontend.vercel.app", // Vercel deployment
  "http://localhost:3001"
   
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
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Allow credentials (cookies, etc.)
  })
);

// Routes
app.use("/api/admin", addProductDataRoute);
// app.use("/api/user",userRegisterRoute) ;
app.use("/api/user",getProductDataRoute);
app.use("/api/user", getProductByIDRoute);      
app.use("/api/user",cartRoute,)    
app.use("/api/user", getCartDataRoute) 
app.use('/api/user', getUserDataRoute) 
app.use("/api/user", saveMyOrderRouter)
app.use("/api/user", getMyOrderRoute)

app.use("/api/user", deleteCartItemRoute) 
app.use("/api/user", saveUserDataRoute)  
app.use("/api/admin", getTotalOrderRoute) 
app.use("/api/user", categoryDataRoute) 
app.use("/api/user", getOrderDetailRoute) 
app.use("/api/user", registerUserRoute)
app.use("/api/user", generateOTPRoute)
app.use("/api/admin",updateProductRouter) 
app.use("/api/admin", deleteProductRoute)



// Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
