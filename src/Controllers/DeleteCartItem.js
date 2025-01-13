// import { cartData } from "../Modules/CartData";
// const {cartDate}= require("../Modules/CartData")/

const { cartData } = require("../Modules/CartData");

const deleteCartItemController = async (req, res) => {
  try {
    const { mobile_number } = req; // Extracting mobile number from the request
    const { id } = req.body; // Extracting the product ID to delete 
    console.log(id)

    // Find the user's cart by their mobile number
    const userCart = await cartData.findOne({ mobileNumber: req.mobile_number });

    if (!userCart) {
      return res.status(404).json({ message: "Cart not found for this user" });
    }

    // Remove the product from the user's cart 
    
    const updatedProducts = userCart.products.filter(
      (product) => product.id.toString() !== id
      
    );
    const updateProducts = userCart.products.filter(
        (product) => product._id.toString() !== id
        
      );
  console.log(updatedProducts)
    // Update the cart data in the database
    userCart.products = updatedProducts;
    await userCart.save();

    return res.status(200).json({ message: "Item deleted successfully", products: updatedProducts });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

  module.exports= { deleteCartItemController };
