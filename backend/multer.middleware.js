import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.config.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const roomCode = req.body?.roomCode || req.query?.roomCode || req.headers["x-room-code"] || "general";
    return {
      folder: "uploads",
      resource_type: "auto",
      tags: [`room_${roomCode}`]
    };
  }
});

const upload = multer({ storage });

export default upload;