
const { Order } = require("../Modules/MyOrder");
const mongoose = require("mongoose"); // Optional: for ObjectId conversion if needed

const saveOrderController = async (req, res) => {
  const {
    userName,
    mobileNumber,
    address,
    deliveryOption,
    paymentMethod,
    total,
    id,
    items, // Expecting an array of items from the frontend
  } = req.body;
console.log(req.body)
  // Validate required fields
  if (
    !userName ||
    !mobileNumber ||
    !address ||
    // // !deliveryOption ||
    !paymentMethod ||
    !total ||
    !id ||
    !items ||
    !Array.isArray(items)
  ) {
    return res
      .status(400)
      .json({ message: "All fields including items array are required" });
  }

  try {
    // Validate and transform each item using frontend keys
    const validatedItems = items.map((item) => {
      if (
        !item.productName ||
        !item.quantity ||
        !item.productPrice 
        // // !item.productCategory ||
        // // !item.productImg ||
        // // !Array.isArray(item.productImg) ||
        // // item.productImg.length === 0
      ) {
        throw new Error(
          "Each item must have productName, quantity, productPrice, productCategory, and at least one image"
        );
      }
      return {
        itemName: item.productName,
        quantity: Number(item.quantity),
        price: Number(item.productPrice),
        unit: item.unit || "", // Set default if unit is not provided
        category: item.productCategory,
        image: [item.productImg[0]], // Store only the first image (as per your original code)
      };
    });

    // Get current date and time for progress status
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    // Initialize order progress statuses
    const progressStatus = [
      {
        status: "Order Confirmed",
        date: now,
        timing: `${hours}:${minutes}:${seconds}`,
      },
      { status: "Shipped", date: null, timing: null },
      { status: "Out for Delivery", date: null, timing: null },
      { status: "Delivered", date: null, timing: null },
    ];

    // Prepare a new order object (to be stored within the orders array)
    const newOrder = {
      id, // Optionally, you can convert this to an ObjectId if needed
      total: Number(total),
      deliveryOption,
      paymentMethod,
      items: validatedItems,
      placedAt: now,
      progress: progressStatus,
    };

    // Check if an order document already exists for this mobile number
    let existingOrder = await Order.findOne({ mobileNumber });

    if (existingOrder) {
      // Add the new order to the existing orders array
      existingOrder.orders.push(newOrder);
      await existingOrder.save();
      return res.status(200).json({
        message: "Order added successfully",
        order: newOrder,
      });
    } else {
      // Create a new Order document if one does not exist for this mobile number
      const order = new Order({
        userName,
        mobileNumber,
        address,
        deliveryOption,
        paymentMethod,
        total: Number(total),
        id, // Or mongoose.Types.ObjectId(id) if conversion is necessary
        orders: [newOrder],
      });
      await order.save(); 
    
      return res.status(201).json({
        message: "Order created successfully",
        order: newOrder,
      });
    }
  } catch (error) {
    console.error("Error saving order:", error.message);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { saveOrderController };
