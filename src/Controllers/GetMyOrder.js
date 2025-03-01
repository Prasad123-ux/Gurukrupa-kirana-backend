
const { Order } = require("../Modules/MyOrder");

const getMyOrdersController = async (req, res) => {
  try {
    const mobileNumber = req.mobile_number; // Get mobile number from the request
    console.log("Mobile Number:", mobileNumber);
    
    if (!mobileNumber) {
      return res.status(400).json({ status: false, message: "Mobile number is required." });
    }
    
    // Create a cache key for this user's order data
  
    // 🔹 If cache miss, fetch order data from the database
    const order = await Order.findOne({ mobileNumber }).exec();
    
    if (order) {
      
      
      return res.status(200).json({
        status: true,
        message: "User Found",
        data: order
      });
    } else {
      return res.status(404).json({ status: false, message: "Sorry, You don't have any order" });
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
