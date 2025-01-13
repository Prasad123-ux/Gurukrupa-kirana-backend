const {userRegister}= require("../Modules/UserData")

const getUserDataController=(req, res)=>{

    console.log(req.body) 

    userRegister.findOne({mobile_number:req.mobile_number}).exec()
    .then((user)=>{ 
        if(user!==null){
           return  res.status(200).json({status:true, message:"user found", data:user})       
         }else{
            return res.status(404).json({status:false, message:'user not found'})
         }

    }).catch((err)=>{
        res.status(500).json({status:false, message:"Internal server error",error:err.message})
    })
}

module.exports={getUserDataController}