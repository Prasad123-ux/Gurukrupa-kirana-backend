const { mongoose } = require('../Config/db.js');

const orderSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  address: { type: String, required: true },
  deliveryOption: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  total: { type: Number, required: true },
  id: { type: mongoose.Schema.Types.ObjectId, required: true },
  orders: [
    { 
      items: [
        {
          itemName: { type: String, required: true }, // Name of the item
          price: { type: Number, required: true },    // Price of the item
          quantity: { type: Number, required: true }, // Quantity of the item
          unit: { type: String }, 
          category: { type: String },
          image: { type: [String] }, // Array of image URLs
        },
      ],
      total: { type: Number, required: true },        // Order total
      deliveryOption: { type: String, required: true },
      paymentMethod: { type: String, required: true },
      placedAt: { type: Date, default: Date.now },
      progress: [
        {
          status: { type: String, required: true }, // Order status (e.g., "Order Confirmed")
          date: { type: Date },     
          timing:{type:String}               // Date when the status was updated
        },
      ],
    },
  ],
});

const Order = mongoose.model('Order', orderSchema);
module.exports = { Order };
