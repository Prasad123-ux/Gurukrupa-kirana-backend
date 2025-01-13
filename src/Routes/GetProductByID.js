const express = require("express");
const { getProductByIDController } = require("../Controllers/GetProductByID");
const getProductByIDRoute = express.Router();

// Define route with route parameter ':id'
getProductByIDRoute.get("/getProductDetail/:id", getProductByIDController);

module.exports = { getProductByIDRoute };
