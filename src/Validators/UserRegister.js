const {check} = require("express-validator") 

const userRegisterValidator=[
    check("userInfo.mobile_number", "Please enter valid mobile Number").isMobilePhone()
]


module.exports={userRegisterValidator} 

