import express from "express";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/protected", protect, (req, res) => {
  res.json({
    message: "🎉 You are authorized to see this!",
    user: req.user, // comes from middleware
  });
});

export default router;
