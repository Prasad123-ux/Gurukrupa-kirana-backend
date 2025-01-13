const express= require("express")
const { CartAuthMiddleware } = require("../Middleware/CartAuthMiddleware")
const { getUserDataController } = require("../Controllers/GetUserData")
const getUserDataRoute=express.Router() 



getUserDataRoute.post("/getUserData", CartAuthMiddleware, getUserDataController)



module.exports={getUserDataRoute}