const express = require("express")
const { addUserController } = require("../Controllers/AddUser")
const registerUserRoute= express.Router() 



registerUserRoute.post("/register", addUserController)


module.exports={registerUserRoute}