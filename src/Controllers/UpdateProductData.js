const { ProductRegister } = require("../Modules/ProductData");


 
 
 const updateProductDataController=async(req,res)=>{
    try {
        const { id } = req.params; // Get product ID
        const updateData = { ...req.body }; // Get all updated fields
    
        // If a new photo is uploaded, update the photo field
        if (req.file) {
          updateData.photo = req.file.path; // Save file path
        }
    
        // Find and update the product
        const updatedProduct = await ProductRegister.findByIdAndUpdate(id, updateData, {
          new: true, // Return updated document
          runValidators: true, // Validate new values
        });
    
        if (!updatedProduct) {
          return res.status(404).json({ message: "Product not found" });
        }
    
        res.status(200).json({ message: "Product updated successfully", updatedProduct });
      } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
      }


}

module.exports={updateProductDataController}