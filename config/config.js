
require('dotenv').config({path:"../.env"});
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');



if(!process.env.MONGO_URL){
     throw new Error("MONGO variable IS NOT EXIST")
}

const storage = new CloudinaryStorage({
     cloudinary,
    params:{
        folder: 'VistaraImage',
        allowedFormats: ["png", "jpg", "jpeg"]
    }
})

cloudinary.config({

    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET_KEY
})



module.exports={
    MONGO_URL:process.env.MONGO_URL,
    EMAIL_USER:process.env.EMAIL_USER,
    EMAIL_PASS:process.env.EMAIL_PASS,
    SECRET_KEY:process.env.SECRET_KEY,
    storage,
    cloudinary
}