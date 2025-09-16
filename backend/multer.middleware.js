import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "cloudinary.config.js";

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder: "uploads",
        source_type: "auto"
    }
});

const uplaod = multer({storage});

export default uplaod;