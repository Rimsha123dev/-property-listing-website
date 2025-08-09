"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upload_1 = __importDefault(require("../middleware/upload")); // adjust path if needed
const router = express_1.default.Router();
// POST /api/properties/upload
router.post("/", upload_1.default.single("image"), (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: "No image provided" });
        }
        return res.status(200).json({ imageUrl: file.path }); // Cloudinary returns image URL in `path`
    }
    catch (err) {
        console.error("Upload failed:", err);
        return res.status(500).json({ message: "Image upload failed" });
    }
});
exports.default = router;
