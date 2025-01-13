const { mongoose } = require('../Config/db.js');

// Schema for the cart
const cartSchema = new mongoose.Schema(
  {
    mobileNumber: {
      type: String,
      required: true,
      unique: true, // Ensures one cart per user
    },
    products: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", // Reference to the Product model
          required: true,
        },
        name: {
          type: String,
          // Mandatory for products
          trim: true, // Removes unnecessary spaces
        },
        price: {
          type: Number,
          // Price is mandatory
          min: 0, // Price cannot be negative
        },
        description: {
          type: String,
          default: "", // Default to an empty string
          trim: true,
        },
        image: {
          type: [],
          validate: {
            validator: function (v) {
              return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(v); // Validates image URL
            },
            message: (props) => `${props.value} is not a valid image URL!`,
          },
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity must be at least 1"], // Ensures positive quantity
        },
        unit: {
          type: String,
           // Ensures unit is always provided
          trim: true,
        },
        category: {
          type: String,
           // Category is mandatory
          trim: true,
        },
      },
    ],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Indexing for optimized queries
cartSchema.index({ "products.id": 1 }); // For searching products in the cart

// Model for the cart
const cartData = mongoose.model("Cart", cartSchema);

module.exports = { cartData };
