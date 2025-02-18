const { ProductRegister } = require("../Modules/ProductData");

const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params; 
    console.log(id)

    // Wait for the delete operation to complete
    const DeleteOperation = await ProductRegister.findByIdAndDelete(id);

    if (!DeleteOperation) {
      return res.status(400).json({ status: false, message: "Product not found or already deleted" });
    }

    res.status(200).json({ status: true, message: "Product Deleted Successfully" });

  } catch (err) {
    res.status(500).json({ status: false, message: "Internal Server Error", error: err.message });
  }
};

module.exports = { deleteProductController };
