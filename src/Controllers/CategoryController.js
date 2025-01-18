// import { ProductRegister } from "../Modules/ProductData" 
const {ProductRegister}= require("../Modules/ProductData")

const categoryController=(req,res)=>{ 
    const {category}=req.body
    console.log(category)

ProductRegister.find({productCategory:category}).exec()
.then((data)=>{ 
    console.log(data)
    if(data!==null){
        res.status(200).json({status:true, message:"Data Found", data:data})

    }else{
        res.status(404).json({status:false, message:"Data Not Available", })

    }

}).catch((err)=>{
    res.status(500).json({status:false, message:"Internal Server error",error:err.message })


})

}

module.exports={categoryController}