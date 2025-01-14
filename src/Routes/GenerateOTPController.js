const express = require("express")
const { userRegisterValidator } = require("../Validators/UserRegister")
const { generateOTPController } = require("../Controllers/generateOtp")
const generateOTPRoute= express.Router() 


generateOTPRoute.post("/sendOTP",userRegisterValidator, generateOTPController)

module.exports={generateOTPRoute}