const { ProductRegister } = require("../Modules/ProductData");


const getProductDataController = async (req, res) => {
  try {
   
    const products = await ProductRegister.find();

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }


    // Step 4: Return Data to Frontend
    res.status(200).json({ data: products });

  } catch (error) {
    console.error("❌ Error fetching product data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getProductDataController };
