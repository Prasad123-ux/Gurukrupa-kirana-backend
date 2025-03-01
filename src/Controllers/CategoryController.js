
const { ProductRegister } = require("../Modules/ProductData");

const categoryController = async (req, res) => {
  try {
    const { category } = req.body;
    console.log("Requested category:", category);

const data = await ProductRegister.find({ productCategory: category });

    if (data && data.length > 0) {
      // Optionally, update the cache with the full product list.
      // If you already cache all products under "productData", you might want to merge data.
      // For now, we simply return the result from DB.
      return res.status(200).json({
        status: true,
        message: "Data found in database",
        data: data,
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "Data not available",
      });
    }
  } catch (err) {
    console.error("❌ Error:", err.message);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

module.exports = { categoryController };
