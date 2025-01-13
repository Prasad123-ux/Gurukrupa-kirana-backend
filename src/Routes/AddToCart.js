// import express from "express";
const express= require("express")
// import { CartAuthMiddleware } from "../Middleware/CartAuthMiddleware"; 
const {addToCartController}= require("../Controllers/AddToCart")  
const {CartAuthMiddleware}= require("../Middleware/CartAuthMiddleware") 

const cartRoute = express.Router();

// Add to Cart route with authentication middleware
cartRoute.post("/addToCart", CartAuthMiddleware, addToCartController);

module.exports={cartRoute} 

