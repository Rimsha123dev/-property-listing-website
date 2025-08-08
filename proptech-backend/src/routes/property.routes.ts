import { Router } from "express";
import { createProperty } from "../controllers/property.controller";
import { getAllProperties } from "../controllers/property.controller";
import { protect } from "../middleware/authMiddleware";
import { getPropertyById } from "../controllers/property.controller";
import { updateProperty } from "../controllers/property.controller";
import { deleteProperty } from "../controllers/property.controller";
const router = Router();
import upload from "../middleware/upload"; // or wherever you placed the multer setup
import { uploadImage } from "../controllers/property.controller";
import { searchProperties } from "../controllers/property.controller";


// router.post("/upload", upload.single("image"), uploadImage);
router.post(
  "/upload",
  (req, res, next) => {
    console.log("📥 Upload route hit");
    next();
  },
  upload.single("image"),
  (req, res, next) => {
    console.log("📷 File received by multer:", req.file);
    next();
  },
  uploadImage
);





router.post("/create", protect, createProperty);
router.get("/all", getAllProperties);
router.get("/:id", getPropertyById);
router.put("/:id", protect, updateProperty);
router.delete("/:id", protect, deleteProperty);
router.get("/search", searchProperties);

export default router;
