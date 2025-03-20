import express from "express";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected route for fetching dashboard data
router.get("/", protect, (req, res) => {
  res.json({ message: `Welcome to your dashboard, ${req.user.name}` });
});

export default router;
