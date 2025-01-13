 const jwt= require("jsonwebtoken")
const { userRegister } = require("../Modules/UserData")
 
 
 const CartAuthMiddleware=(req, res,next)=>{ 
    const token= req.body.token 
    console.log(token)
    if (token===undefined){
        res.status(403).json({status:false, message:"Authentication Error"})
    }else{
        const decoded=jwt.verify(token,process.env.JWT_TOKEN) 
        req.mobile_number= decoded.mobile_number  

        userRegister.findOne({mobile_number:decoded.mobile_number}).exec() 
        .then((user)=>{
            if(user!==null) {
                next()
            }else{
                res.status(403).json({status:false,message:'user not found'})
            }
        }).catch((err)=>{ 
            res.status(500).json({status:true,message:"Internal Server Error",error:err.message})

        })
    }

}
module.exports={CartAuthMiddleware}