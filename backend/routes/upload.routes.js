import express from "express";

const router = express.Router();

router.post("/upload", upload.single("file"), (req,res) => {
    try {
        return res.json({
            url: req.file.path,
            public_id: req.file.filename
        });
    } catch (error) {
        return res.status(500).json({message : "Upload failed error!", error});
    }
});

export default router;