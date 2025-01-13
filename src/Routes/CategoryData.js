const express= require("express")
const { categoryController } = require("../Controllers/CategoryController")
const categoryDataRoute= express.Router() 


categoryDataRoute.post("/categoryWiseData", categoryController) 


module.exports={categoryDataRoute}