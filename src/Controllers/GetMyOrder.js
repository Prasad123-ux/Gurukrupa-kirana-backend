// const client = require("../../redisConfig");
// const { Order } = require("../Modules/MyOrder");

// const getMyOrdersController = async (req, res) => {
//   try {
//     const mobileNumber = req.mobile_number; // Get mobile number from the request
//     console.log("Mobile Number:", mobileNumber);
    
//     if (!mobileNumber) {
//       return res.status(400).json({ status: false, message: "Mobile number is required." });
//     }
    
//     // Create a cache key for this user's order data
//     const cacheKey = `order:${mobileNumber}`;
    
//     // 🔹 Check if order data is available in Redis cache
//     const cachedOrderData = await client.get(cacheKey);
//     if (cachedOrderData) {
//       console.log("✅ Cache Hit: Returning order data from cache.");
//       return res.status(200).json({
//         status: true,
//         message: "User Found (from cache)",
//         data: JSON.parse(cachedOrderData)
//       });
//     }
    
//     // 🔹 If cache miss, fetch order data from the database
//     const order = await Order.findOne({ mobileNumber }).exec();
    
//     if (order) {
//       // 🔹 Save the fetched order data in Redis with an expiration time (TTL)
//       // Here, TTL is set to 3600 seconds (1 hour). Adjust as needed.
//       // await client.set(cacheKey, 3600, JSON.stringify(order)); 
//       await client.set(cacheKey, JSON.stringify(order),)
      
//       return res.status(200).json({
//         status: true,
//         message: "User Found",
//         data: order
//       });
//     } else {
//       return res.status(404).json({ status: false, message: "Sorry, You don't have any order" });
//     }
//   } catch (err) {
//     console.error("❌ Error:", err.message);
//     return res.status(500).json({
//       status: false,
//       message: "Internal Server Error",
//       error: err.message
//     });
//   }
// };

// module.exports = { getMyOrdersController };
const client = require("../../redisConfig");
const { Order } = require("../Modules/MyOrder");

const getMyOrdersController = async (req, res) => {
  try {
    // Extract mobile number from request (adjust based on how you send data)
    const { mobile_number } = req.mobile_number;  // or use req.query / req.params if needed
    
    console.log("📞 Mobile Number:", mobile_number);
    
    if (!mobile_number) {
      return res.status(400).json({ status: false, message: "Mobile number is required." });
    }
    
    // Create a cache key specific to the user's orders
    const cacheKey = `order:${mobile_number}`;
    
    // 🔹 Check if order data is available in Redis cache
    const cachedOrderData = await client.get(cacheKey);
    if (cachedOrderData) {
      console.log("✅ Cache Hit: Returning order data from cache.");
      return res.status(200).json({
        status: true,
        message: "Orders retrieved from cache",
        data: JSON.parse(cachedOrderData)
      });
    }
    
    // 🔹 If cache miss, fetch order data from MongoDB
    console.log("🟡 Cache Miss: Fetching order data from MongoDB...");
    const order = await Order.findOne({ mobileNumber: mobile_number }).exec();
    
    if (order) {
      // 🔹 Save the fetched order data in Redis with a 1-hour expiration time
      await client.setEx(cacheKey, 3600, JSON.stringify(order));  // TTL = 3600 sec (1 hour)
      
      console.log("✅ Order data cached in Redis for 1 hour.");

      return res.status(200).json({
        status: true,
        message: "Orders retrieved from database",
        data: order
      });
    } else {
      return res.status(404).json({ status: false, message: "No orders found for this mobile number" });
    }
  } catch (err) {
    console.error("❌ Error:", err.message);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: err.message
    });
  }
};

module.exports = { getMyOrdersController };
