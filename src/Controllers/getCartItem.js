
// const client = require("../../redisConfig");
// const {cartData}= require("../Modules/CartData");  
// const { ProductRegister } = require("../Modules/ProductData");



// const getCartItemController=async(req, res)=>{ 
//     try{

// if (!(req.mobile_number)) {
//     return res.status(400).json({ message: "Please log in Yourself" });
//   }
    
     
//   // trying for cached data if cart data is their
// const cachedCartData = await client.get("cartData");

//     if(cachedCartData){    
//         const cartList = JSON.parse(cachedCartData);
//         const userCart=cartList.find((cart)=>cart.mobileNumber===req.mobile_number)  
//         console.log(userCart) 
               
//  if (userCart) {
//    return res.status(200).json({message:"Data Send to frontend",  data: userCart});
//       } else {
            
//         return res.status(404).json({ message: "Cart not found in cache" });
//    }
        
// } 
// else{
// const dbCartData = await cartData.find();  
        
        
//         if (!dbCartData || dbCartData.length === 0) {
//             return res.status(200).json({ message: "No items in cart data" });
//           }

    

//            await client.setEX("cartData", 15552000, JSON.stringify(dbCartData)); 
//           // await client.set("cache")
//           const userCart = dbCartData.find((cart) => cart.mobileNumber === req.mobile_number);


//           if (userCart) { 
          
       
//             return res.status(200).json({ data: userCart });
//           } else {
//             return res.status(404).json({ message: "Cart not found in database" });
//           }
//         }

//         } catch (err) {
//             console.error("❌ Error:", err.message);
//             res.status(500).json({ message: "Internal Server Error", error: err.message });
//           }
// } 


// module.exports={getCartItemController}  




const { cartData } = require("../Modules/CartData");  
const { ProductRegister } = require("../Modules/ProductData");

const getCartItemController = async (req, res) => { 
    try {
        // Extract mobile number from request
        const { mobile_number } = req.mobile_number;  // Assuming the mobile number is sent in the request body

        if (!req.mobile_number) {
            return res.status(400).json({ message: "Please log in yourself" });
        }

        
        const dbCartData = await cartData.find({ mobileNumber: req.mobile_number });

        if (!dbCartData || dbCartData.length === 0) {
            return res.status(404).json({ message: "Cart not found in database" });
        }

       

        console.log("✅ Cart data cached in Redis");

        return res.status(200).json({
            message: "Data sent from MongoDB",
            data: dbCartData,
        });

    } catch (err) {
        console.error("❌ Error:", err.message);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

module.exports = { getCartItemController };
