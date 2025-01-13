// import { Order } from "../Modules/MyOrder" 
const {Order}= require("../Modules/MyOrder")

const getOrderDetail=(req, res)=>{
    const {innerID}= req.params 
 console.log(innerID)

Order.findOne({_id:innerID}).exec()
.then((data)=>{ 
    if(data!==null){
        return res.status(200).json({status:false, message:"Data Found with Order ID", data:data})
    }else{
        return res.status(404).json({status:false, message:"Sorry..! We could not found any order with provided ID"})
    }

}).catch((err)=>{
    return res.status(500).json({status:false, message:"Internal Server Error", error:err.message})

})


} 

module.exports={getOrderDetail}