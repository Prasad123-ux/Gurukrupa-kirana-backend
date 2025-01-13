const express = require("express")
const { addUserController } = require("../Controllers/AddUser")
const { userRegisterValidator } = require("../Validators/UserRegister")
const registerUserRoute= express.Router() 



registerUserRoute.post("/register",userRegisterValidator, addUserController)


module.exports={registerUserRoute}