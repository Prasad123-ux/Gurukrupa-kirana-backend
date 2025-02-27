const client = require("../../redisConfig");
const { ProductRegister } = require("../Modules/ProductData");

const categoryController = async (req, res) => {
  try {
    const { category } = req.body;
    console.log("Requested category:", category);

    if (!category) {
      return res.status(400).json({ status: false, message: "Category is required" });
    }

    // 🔹 Attempt to fetch cached product data from Redis
    const cachedProductData = await client.get("productData");

    if (cachedProductData) {
      console.log("✅ Cache Hit: Product data found in Redis");
      // Parse cached data into an array of products
      const productList = JSON.parse(cachedProductData);

      // Filter products by category
      const filteredProducts = productList.filter(
        (product) => product.productCategory === category
      );

      if (filteredProducts.length > 0) {
        return res.status(200).json({
          status: true,
          message: "Data found in cache",
          data: filteredProducts,
        });
      } else {
        console.log("No matching products in cache for this category.");
      }
    } else {
      console.log("❌ Cache Miss: No product data found in Redis.");
    }

    // 🔹 Fallback: Fetch data from the database
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
