// import { getMyOrdersController } from "../Controllers/GetMyOrder"
// import { CartAuthMiddleware } from "../Middleware/CartAuthMiddleware"
const express = require("express")
const {getMyOrdersController}= require("../Controllers/GetMyOrder")
const {CartAuthMiddleware}= require("../Middleware/CartAuthMiddleware")

const getMyOrderRoute= express.Router()



getMyOrderRoute.post("/getMyOrders", CartAuthMiddleware, getMyOrdersController)



module.exports={getMyOrderRoute}  