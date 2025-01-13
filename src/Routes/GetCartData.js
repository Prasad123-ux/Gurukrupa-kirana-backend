const express= require("express")
const { CartAuthMiddleware } = require("../Middleware/CartAuthMiddleware")
const { getCartItemController } = require("../Controllers/getCartItem")
const getCartDataRoute= express.Router() 





getCartDataRoute.post("/getCartData", CartAuthMiddleware, getCartItemController) 


module.exports={getCartDataRoute}