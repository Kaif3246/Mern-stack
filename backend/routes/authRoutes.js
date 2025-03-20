import express from "express";
import {getUser, register, login, logout } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
// Add this route
router.get("/user", protect, getUser);

export default router;
