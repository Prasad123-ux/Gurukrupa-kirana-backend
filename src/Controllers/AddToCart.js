const { cartData } = require("../Modules/CartData");
const { ProductRegister } = require("../Modules/ProductData");

const addToCartController = async (req, res) => {
  const client = require("../../redisConfig") 


  // Extract values from request body
  const { 
    productName,
    productCategory,
    productPrice,
    productUnit,
    productImg,
    productID,
    quantity // Ensure quantity is included
  } = req.body.cartData;

  const mobileNumber = req.mobile_number;

  // Validate request 
  if (!productCategory || !productPrice || !productUnit || !productImg || !productID) {
    return res.status(400).json({
      status: false,
      message: "All fields (id, quantity, category, name, price, unit, image) are required.",
    });
  }

  try { 
    // Fetch product details
    const product = await ProductRegister.findById(productID);
    if (!product) {
      return res.status(404).json({
        status: false,
        message: "Product not found.",
      });
    }

    // Check for an existing cart
    let cart = await cartData.findOne({ mobileNumber });

    if (cart) { 
      const productIndex = cart.products.findIndex(
        (item) => item.productID.toString() === productID.toString()
      );

      if (productIndex > -1) {
        // Ensure quantity exists before updating
        if (!cart.products[productIndex].quantity) {
          cart.products[productIndex].quantity = 0;
        }
        cart.products[productIndex].quantity += 1;
      } else {
        cart.products.push({
          productName,
          productCategory,
          productPrice,
          productUnit,
          productImg,
          productID,
          quantity: parseInt(quantity, 10) || 1, // Default quantity to 1
        });
      }
    } else {
      // Create new cart
      cart = new cartData({
        mobileNumber,
        products: [
          {
            productName,
            productCategory,
            productPrice,
            productUnit,
            productImg,
            productID,
            quantity: parseInt(quantity, 10) || 1, // Default quantity to 1
          }
        ]
      });
    }

    // Save cart
    await cart.save();
    await client.del("cartData"); 

    return res.status(200).json({
      status: true,
      message: "Cart updated successfully.",
      cart,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Internal server error.",
      error: err.message,
    });
  }   
};

module.exports = { addToCartController };
