const express = require("express") 
const { deleteProductController } = require("../Controllers/DeleteProduct")
const deleteProductRoute= express.Router() 





deleteProductRoute.delete("/deleteProduct/:id",deleteProductController) 

module.exports={deleteProductRoute}