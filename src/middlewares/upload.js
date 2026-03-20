const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;


// connect cloudinary with my cloudinary account
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


// telling multer that use cloudinary as storage
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder : "Amble",
        allowed_formats : ["jpg", "jpeg", "png", "webp"]
    }
});


// attach the middleware
const upload = multer({
    storage
});

module.exports = upload;