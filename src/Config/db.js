const mongoose= require('mongoose')
const env= require("dotenv")
env.config()  



  mongoose.connect(`mongodb://0.0.0.0/gurukrupaKirana`) 
//    mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@snackhub.gbljr.mongodb.net/?retryWrites=true&w=majority&appName=snackhub`)
.then(()=>{
    console.log("connected",)

}).catch((e)=>{ 
    console.log(process.env.MONGO_PASS)
    console.log(process.env.MONGO_USER)

    console.log("not connected", e)
}
)

module.exports={mongoose}  

