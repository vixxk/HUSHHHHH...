import express from "express";
import upload from "../multer.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload a file to Cloudinary
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The file to upload
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   description: Cloudinary URL of the uploaded file
 *                 public_id:
 *                   type: string
 *                   description: Cloudinary public ID of the file
 *       500:
 *         description: Upload failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: object
 */
router.post("/upload", upload.single("file"), (req, res) => {
  try {
    return res.json({
      url: req.file.path,
      public_id: req.file.filename,
    });
  } catch (error) {
    return res.status(500).json({ message: "Upload failed error!", error });
  }
});

export default router;
