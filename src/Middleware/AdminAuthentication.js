
const jwt= require("jsonwebtoken")

const adminAuthentication=(req, res, next)=>{ 

    const token = req.body.token 
    if (token===undefined){
        res.status(403).json({status:false, message:"Authentication Error"})
    }else{
        const decoded=jwt.verify(token,process.env.JWT_TOKEN) 
        req.mobile_number= decoded.mobile_number  

      if(req.mobile_number==9359334431||9307173845||8530825101) {
        next() 
      }     else{
        return res.status(404).json({status:false, message:"Authentication Error"}) 

      }
        
    }



}

module.exports={adminAuthentication}