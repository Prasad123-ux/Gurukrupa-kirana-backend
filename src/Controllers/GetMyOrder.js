const {Order} = require("../Modules/MyOrder")

const getMyOrdersController=(req, res)=>{ 



    console.log(req.mobile_number)
    Order.findOne({mobileNumber:req.mobile_number}).exec() 
  
    .then((user)=>{ 
        
        if(user!==null){ 
          res.status(200).json({status:true, message:"User Found", data:user})

        }else{
            res.status(404).json({status:false, message:"Sorry You don't have any order"})

        }

    }).catch((err)=>{
        res.status(500).json({status:false, message:"Internal Server error", error:err.message})


    })
}

module.exports={getMyOrdersController}