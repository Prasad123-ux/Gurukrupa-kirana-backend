const mongoose= require('mongoose')
const env= require("dotenv")
env.config()  



      mongoose.connect(`mongodb://0.0.0.0/gurukrupaKirana`) 
//  mongoose.connect (`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.v7w6b.mongodb.net/Gurukrupa_kirana?retryWrites=true&w=majority&appName=Cluster0`,{serverSelectionTimeoutMS: 100000 })
.then(()=>{
    console.log("connected",)
    console.log(process.env.MONGO_PASS)
    console.log(process.env.MONGO_USER)

}).catch((e)=>{ 
    console.log(process.env.MONGO_PASS)
    console.log(process.env.MONGO_USER)

    console.log("not connected", e)
}
)

module.exports={mongoose}  

