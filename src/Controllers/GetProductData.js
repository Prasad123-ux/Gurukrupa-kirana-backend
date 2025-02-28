

const {ProductRegister}= require("../Modules/ProductData")
const client = require("../../redisConfig") 


const getProductDataController = async (req, res) => {
  try {
    const cacheKey = "productData"; // Key for Redis Cache

    // Step 1: Check if data is in Redis Cache
    const cachedData = await client.get(cacheKey);

    if (cachedData) {
      console.log("✅ Serving from Redis Cache");
      return res.status(200).json({ data: JSON.parse(cachedData) }); // Return Cached Data
    }

    // Step 2: If not cached, fetch from Database
    console.log("🟡 Fetching data from MongoDB...");
    const products = await ProductRegister.find();

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    // Step 3: Store Data in Redis with Expiration (1 Hour)
    await client.set(cacheKey, 15552000, JSON.stringify(products));

    console.log("✅ Data Cached in Redis");

    // Step 4: Return Data to Frontend
    res.status(200).json({ data: products });

  } catch (error) {
    console.error(" Error fetching product data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {getProductDataController }