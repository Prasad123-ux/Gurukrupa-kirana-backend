const { cartData } = require("../Modules/CartData");
const { ProductRegister } = require("../Modules/ProductData");

const addToCartController = async (req, res) => {
  const { id, quantity, category, name, price, unit, image } = req.body;
  const mobileNumber = req.mobile_number; // Retrieved from token

  // Validate request
  if (!id || !quantity || !category || !name || !price || !unit || !image) {
    return res.status(400).json({
      status: false,
      message: "All fields (id, quantity, category, name, price, unit, image) are required.",
    });
  }

  try { 
    console.log(category,price,unit,image[0])
    // Fetch product details
    const product = await ProductRegister.findById(id);
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
        (item) => item.id.toString() === id
      );

      if (productIndex > -1) {
        // Update quantity if product exists
        cart.products[productIndex].quantity += parseInt(quantity, 10);
      } else {
        // Add new product to the cart
        cart.products.push({ id, name, price, category, unit, image, quantity });
      }
    } else {
      // Create new cart
      cart = new cartData({
        mobileNumber,
        products: [{ id, name, price, category, unit, image, quantity }],
      });
    }

    // Save cart
    await cart.save();

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
