const express = require("express")
const { adminAuthentication } = require("../Middleware/AdminAuthentication")
const { getTotalOrderController } = require("../Controllers/GetTotalOrder")
const getTotalOrderRoute=express.Router()


getTotalOrderRoute.post("/getTotalOrder", adminAuthentication, getTotalOrderController)

module.exports={getTotalOrderRoute}