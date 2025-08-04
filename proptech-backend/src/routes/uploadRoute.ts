import express from "express";
import upload from "../middleware/upload"; // adjust path if needed

const router = express.Router();

// POST /api/properties/upload
router.post("/", upload.single("image"), (req, res) => {
  try {
    const file = req.file as Express.Multer.File;

    if (!file) {
      return res.status(400).json({ message: "No image provided" });
    }

    return res.status(200).json({ imageUrl: file.path }); // Cloudinary returns image URL in `path`
  } catch (err) {
    console.error("Upload failed:", err);
    return res.status(500).json({ message: "Image upload failed" });
  }
});

export default router;
