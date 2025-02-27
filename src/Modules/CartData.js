const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  mobileNumber: { type: String, required: true }, // User's mobile number
  products: [
    {
      // Product ID
      quantity: { type: Number, required: true, min: 1 },
      productName:{type:String, required:true},
      productCategory:{type:String, required:true},
      productPrice:{type:String, required:true},
      productUnit:{type:String, required:true},
      productImg:{type:String, required:true},
      productID: { type: mongoose.Schema.Types.ObjectId,  ref: "Product" }, 
    },
  ],
});

const cartData = mongoose.model("Cart", cartSchema);

module.exports = { cartData };
