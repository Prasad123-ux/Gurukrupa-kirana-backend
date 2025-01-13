const express = require("express")
const { addUserController } = require("../Controllers/AddUser")
const userRegisterRoute= express.Router() 



userRegisterRoute.post("/register", addUserController)


module.exports={userRegisterRoute}