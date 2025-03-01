const { ProductRegister } = require("../Modules/ProductData");


const updateProductDataController = async (req, res) => {
  try {
    const { id } = req.params; // Get product ID
    let updateData = {}; // Store only non-empty fields

    // Filter out empty or undefined fields
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== undefined && req.body[key] !== "") {
        updateData[key] = req.body[key];
      }
    });

    // If a new photo is uploaded, update the photo field
    if (req.file) {
      updateData.photo = req.file.path; // Save file path
    }

    // If no valid data is found to update, return an error response
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No valid data provided for update" });
    }

    console.log(updateData);

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
};

module.exports = { updateProductDataController };
