const {Order}= require("../Modules/MyOrder")

const getTotalOrderController=(req, res)=>{ 

Order.find().exec()
.then((data)=>{
    if(data!==null){
        res.status(200).json({status:true, message:"Data Find", data:data})
    }else{
        res.status(404).json({status:false, message:"Data Not Find",})

    }
}).catch(()=>{
res.status(500).json({status:false, message:"Internal Server error"})
})

}

module.exports={getTotalOrderController}