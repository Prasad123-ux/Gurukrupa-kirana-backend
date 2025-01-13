const {mongoose }= require('../Config/db.js'); 


const userData= new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    mobile_number:{
        type:Number,
        required:false
    },
    address:{
        type:String
    },
    profileImage:{
        type: String,
        required: false,
        validate: {
            validator: function (v) {
                return /^https?:\/\/.+/.test(v); // Validates URLs
            },
            message: "Invalid URL format",
        },
    },
    role:{
        type:String,
        enum:['user', 'admin', ],
        default:'user'
    }
},{timestamps:true})
const userRegister=mongoose.model('userRegister',userData)
module.exports={userRegister}