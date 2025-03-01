// const { cartData } = require("../Modules/CartData");
// const { ProductRegister } = require("../Modules/ProductData");

// const addToCartController = async (req, res) => {
//   const client = require("../../redisConfig") 


//   // Extract values from request body      
//   const { 
//     productName,
//     productCategory,
//     productPrice,
//     productUnit,
//     productImg,
//     productID,
//     quantity // Ensure quantity is included
//   } = req.body.cartData;

//   const mobileNumber = req.mobile_number;

//   // Validate request 
//   if (!productCategory || !productPrice || !productUnit || !productImg || !productID) {
//     return res.status(400).json({
//       status: false,
//       message: "All fields (id, quantity, category, name, price, unit, image) are required.",
//     });
//   }

//   try { 
//     // Fetch product details
//     const product = await ProductRegister.findById(productID);
//     if (!product) {
//       return res.status(404).json({
//         status: false,
//         message: "Product not found.",
//       });
//     }

//     // Check for an existing cart
//     let cart = await cartData.findOne({ mobileNumber });

//     if (cart) { 
//       const productIndex = cart.products.findIndex(
//         (item) => item.productID.toString() === productID.toString()
//       );

//       if (productIndex > -1) {
//         // Ensure quantity exists before updating
//         if (!cart.products[productIndex].quantity) {
//           cart.products[productIndex].quantity = 0;
//         }
//         cart.products[productIndex].quantity += 1;
//       } else {
//         cart.products.push({
//           productName,
//           productCategory,
//           productPrice,
//           productUnit,
//           productImg,
//           productID,
//           quantity: parseInt(quantity, 10) || 1, // Default quantity to 1
//         });
//       }
//     } else {
//       // Create new cart
//       cart = new cartData({
//         mobileNumber,
//         products: [
//           {
//             productName,
//             productCategory,
//             productPrice,
//             productUnit,
//             productImg,
//             productID,
//             quantity: parseInt(quantity, 10) || 1, // Default quantity to 1
//           }
//         ]
//       });
//     }

//     // Save cart
//     await cart.save();
//     await client.del("cartData"); 

//     return res.status(200).json({
//       status: true,
//       message: "Cart updated successfully.",
//       cart,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       status: false,
//       message: "Internal server error.",
//       error: err.message,
//     });
//   }   
// };

// module.exports = { addToCartController };
const { cartData } = require("../Modules/CartData");
const { ProductRegister } = require("../Modules/ProductData");

const addToCartController = async (req, res) => {
  try {
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

    console.log(req.body.cartData.quantity)
    console.log(typeof(req.body.cartData.quantity))
    const { mobile_number } = req.body; // Get mobile number from request
    const parsedQuantity = parseInt(quantity, 10);
    if (isNaN(parsedQuantity) || parsedQuantity < 1) {
      return res.status(400).json({ status: false, message: "Invalid quantity. It must be a number greater than 0." });
    }
    if (!req.mobile_number) {
      return res.status(400).json({ status: false, message: "Mobile number is required." });
    }

    // Validate required fields
    if (!productCategory || !productPrice || !productUnit || !productImg || !productID) {
      return res.status(400).json({
        status: false,
        message: "All fields (id, quantity, category, name, price, unit, image) are required.",
      });
    }

    // Fetch product details
    console.log(productID)
    const product = await ProductRegister.find({_id:productID});
    if (!product) {
      return res.status(404).json({ status: false, message: "Product not found." });
    }

    // Check if the user already has a cart 
    console.log(req.mobile_number)
    let cart = await cartData.findOne({ mobileNumber: req.mobile_number });
   console.log("data found")
    if (cart) {
      // Find if the product already exists in the cart
      const productIndex = cart.products.findIndex(
        (item) => item.productID.toString() === productID.toString()
      );

      if (productIndex > -1) {
        // Update quantity
        console.log("its here")
        // cart.products[productIndex].quantity = Math.max(1, cart.products[productIndex].quantity + parseInt(quantity, 10));
        cart.products[productIndex].quantity = Math.max(1, cart.products[productIndex].quantity + 1);
        console.log("its here")
      } else {
      
        // Add new product to cart
        cart.products.push({
          productName,
          productCategory,
          productPrice,
          productUnit,
          productImg,
          productID,
           quantity:Number(quantity) || 1
          // quantity: Math.max(1, parseInt(quantity, 10)), // Ensure quantity is at least 1
        });
      }
    } else {
      // Create new cart
      
      const parsedQuantity = Number(quantity);
      cart = new cartData({
        mobileNumber: req.mobile_number,
        products: [
          {                    
            productName,
            productCategory,
            productPrice,
            productUnit,
            productImg,
            productID,
           quantity:parsedQuantity || 1

            // quantity: Math.max(1, parseInt(quantity, 10)), // Ensure quantity is at least 1
          }
        ]
      });
    }

    // Save cart to database
    await cart.save();

    // Remove outdated cache for this user's cart


    return res.status(200).json({
      status: true,
      message: "Cart updated successfully.",
      cart,
    });

  } catch (err) {
    console.error("❌ Error:", err.message);
    return res.status(500).json({
      status: false,
      message: "Internal server error.",
      error: err.message,
    });
  }   
};

module.exports = { addToCartController };
