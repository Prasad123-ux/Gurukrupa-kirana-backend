const { ProductRegister } = require("../Modules/ProductData");

 

 const getProductByIDController =async (req, res) => {
   const { id } = req.params; // Extract the id from query parameters
 console.log(id)
   if (!id) {
     return res.status(400).json({
     status: false,
       message: "Product ID is required as a query parameter",
     });
   }



   try{ 

     const cachedProductData= await ProductRegister.findOne({_id:id})
    

     if(product){
       return res.status(200).json({message:"Data found", data:product})
     }
     
   }
   catch(err){
     return res.status(404).json({message:"Internal Server Error",})

   }



  
 };

  module.exports = { getProductByIDController };




// const client = require("../../redisConfig") ; // Import Redis client

// const getProductByIDController = async (req, res) => {
//   const { id } = req.params; // Extract product ID
  

//   if (!id) {
//     return res.status(400).json({
//       status: false,
//       message: "Product ID is required",
//     });
//   }


//   try {
//     // 🔹 Get all product data from Redis
//     const cachedProductData = await client.get("productData");

//     if (cachedProductData) {
      
//       const products = JSON.parse(cachedProductData);

//       // 🔍 Find product by ID
//       const product = products.find((p) => p._id === id);

//       if (product) {
//         return res.status(200).json({
//           status: true,
//           message: "Product found in cache",
//           data: product,
//         });
//       } else {
//         return res.status(404).json({
//           status: false,
//           message: "Product not found in cache",
//         });
//       }
//     }

  
//     return res.status(404).json({
//       status: false,
//       message: "Product data not found in cache",
//     });

//   } catch (err) {
//     console.error("❌ Error:", err.message);
//     return res.status(500).json({
//       status: false,
//       message: "Internal Server Error",
//       error: err.message,
//     });
//   }
// };

// module.exports = { getProductByIDController };
