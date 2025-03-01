// const mongoose = require("mongoose");

// const cartSchema = new mongoose.Schema({
//   mobileNumber: { type: String, required: true }, // User's mobile number
//   products: [
//     {
//       // Product ID
//       quantity: { type: Number, min: 1 },
//       productName:{type:String, required:true},
//       productCategory:{type:String, required:true},
//       productPrice:{type:String, required:true},
//       productUnit:{type:String, required:true},
//       productImg:{type:String, required:true},
//       productID: { type: mongoose.Schema.Types.ObjectId,  ref: "Product" }, 
//     },
//   ],
// });

// const cartData = mongoose.model("Cart", cartSchema);

// module.exports = { cartData };
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  mobileNumber: { 
    type: String, 
    required: true, 
    match: [/^\d{10}$/, "Invalid mobile number format"] // Ensures a 10-digit number
  }, 
  products: [
    {
      productID: { 
        type: mongoose.Schema.Types.ObjectId,  
        ref: "Product",
        required: true
      },
      productName: { type: String, required: true },
      productCategory: { type: String, required: true },
      productPrice: { type: Number, required: true }, // Changed from String to Number
      productUnit: { type: String, required: true },
      productImg: { type: String, required: true },
      quantity: {
        type:Number,
        default:1,
        min:1
      }
    }
  ],
});

const cartData = mongoose.model("Cart", cartSchema);

module.exports = { cartData };
