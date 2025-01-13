const express= require("express")
const { CartAuthMiddleware } = require("../Middleware/CartAuthMiddleware")
const { deleteCartItemController } = require("../Controllers/DeleteCartItem")
const deleteCartItemRoute= express.Router() 




deleteCartItemRoute.post("/deleteCartItem", CartAuthMiddleware, deleteCartItemController)
module.exports={deleteCartItemRoute}