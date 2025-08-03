import { Router } from "express";
import { createProperty } from "../controllers/property.controller";
import { getAllProperties } from "../controllers/property.controller";
import { protect } from "../middleware/protect";
import { getPropertyById } from "../controllers/property.controller";
import { updateProperty } from "../controllers/property.controller";
import { deleteProperty } from "../controllers/property.controller";
const router = Router();

router.post("/create", protect, createProperty);
router.get("/all", getAllProperties);
router.get("/:id", getPropertyById);
router.put("/:id", protect, updateProperty);
router.delete("/:id", protect, deleteProperty);

export default router;
