const express = require("express")
const updateProductRouter=express.Router() 
const upload = require("../Controllers/AddImages")
const { updateProductDataController } = require("../Controllers/UpdateProductData")

updateProductRouter.patch("/updateProduct/:id", upload.single("photo"), updateProductDataController) 


module.exports={updateProductRouter}


