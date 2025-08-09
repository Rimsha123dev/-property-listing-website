"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const property_controller_1 = require("../controllers/property.controller");
const property_controller_2 = require("../controllers/property.controller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const property_controller_3 = require("../controllers/property.controller");
const property_controller_4 = require("../controllers/property.controller");
const property_controller_5 = require("../controllers/property.controller");
const router = (0, express_1.Router)();
const upload_1 = __importDefault(require("../middleware/upload")); // or wherever you placed the multer setup
const property_controller_6 = require("../controllers/property.controller");
const property_controller_7 = require("../controllers/property.controller");
// router.post("/upload", upload.single("image"), uploadImage);
router.post("/upload", (req, res, next) => {
    console.log("📥 Upload route hit");
    next();
}, upload_1.default.single("image"), (req, res, next) => {
    console.log("📷 File received by multer:", req.file);
    next();
}, property_controller_6.uploadImage);
router.post("/create", authMiddleware_1.protect, property_controller_1.createProperty);
router.get("/all", property_controller_2.getAllProperties);
router.get("/:id", property_controller_3.getPropertyById);
router.put("/:id", authMiddleware_1.protect, property_controller_4.updateProperty);
router.delete("/:id", authMiddleware_1.protect, property_controller_5.deleteProperty);
router.get("/search", property_controller_7.searchProperties);
exports.default = router;
