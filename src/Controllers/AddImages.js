const multer= require('multer')

const storage= multer.diskStorage({
    destination:function(req, res, cb){
   cb(null, './src/Uploads')
    }, filename:function(req, file, cb){
        const uniqueSuffix= Date.now()+ "_"+Math.floor(Math.random()*1000+1)
        cb(null, uniqueSuffix + file.originalname)
    }
})

const upload= multer({storage:storage})

module.exports=upload