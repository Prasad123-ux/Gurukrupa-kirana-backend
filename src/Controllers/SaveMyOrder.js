const { Order } = require("../Modules/MyOrder");

const saveOrderController = async (req, res) => {
  const {
    userName,
    mobileNumber,
    address,
    deliveryOption,
    paymentMethod,
    total,
    id,
    items, // Expecting this array from the frontend
  } = req.body;

  // Validate required fields
  if (
    !userName ||
    !mobileNumber ||
    !address ||
    !deliveryOption ||
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
    // Validate and format each item in the items array
    const validatedItems = items.map((item) => {
      if (
        !item.name ||
        !item.quantity ||
        !item.price ||
        !item.unit ||
        !item.category ||
        !item.image[0]
      ) {
        throw new Error(
          "Each item must have an itemName, quantity, price, unit, category, and at least one image"
        );
      }
      return {
        itemName: item.name,
        quantity: item.quantity,
        price: item.price,
        unit: item.unit,
        category: item.category,
        image: item.image[0],
      };
    });
    const now = new Date();


const hours = new Date().getHours().toString().padStart(2, '0');
const minutes = new Date().getMinutes().toString().padStart(2, '0');
const seconds = new Date().getSeconds().toString().padStart(2, '0');

    // Initialize order progress statuses
    const progressStatus = [
      { status: "Order Confirmed", date: new Date(), timing: `${hours}:${minutes}:${seconds}` },
      { status: "Shipped", date: null , timing:null},
      { status: "Out for Delivery", date: null, timing:null },
      { status: "Delivered", date: null, timing:null },
    ];

    // Check if the user already has an entry in the orders collection
    let existingOrder = await Order.findOne({ mobileNumber });

    const newOrder = {
      id,
      total,
      deliveryOption,
      paymentMethod,
      items: validatedItems,
      placedAt: new Date(),
      progress: progressStatus, // Include progress status in each order
    };

    if (existingOrder) {
      // If the user already placed orders, add new order to the existing orders array
      existingOrder.orders.push(newOrder);
      await existingOrder.save();
      return res
        .status(200)
        .json({ message: "Order added successfully", order: newOrder });
    } else {
      // If the user has no existing orders, create a new entry
      const order = new Order({
        userName,
        mobileNumber,
        address,
        deliveryOption,
        paymentMethod,
        total,
        id,
        orders: [newOrder],
      });

      await order.save();
      return res
        .status(201)
        .json({ message: "Order created successfully", order: newOrder });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { saveOrderController };
