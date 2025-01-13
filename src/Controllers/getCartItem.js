// import { cartData } from "../Modules/CartData" 
const {cartData} =require("../Modules/CartData")

const getCartItemController=((req, res)=>{ 

console.log(req.mobile_number) 

cartData.findOne({mobileNumber:req.mobile_number}).exec()
.then((data)=>{
    if(data!==null){
        res.status(200).json({status:true,message:"data found", data:data})
    }else{
        res.status(404).json({status:false, message:"You don't have any time in Cart"})
    }

}).catch((err)=>{
    res.status(500).json({status:false, message:"Internal Server Error", error:err.message})
})

})
module.exports={getCartItemController}