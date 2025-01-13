const express = require("express")
const { getProductDataController } = require("../Controllers/GetProductData")
const getProductDataRoute= express.Router() 



getProductDataRoute.get("/getProductData", getProductDataController) 


module.exports={getProductDataRoute}