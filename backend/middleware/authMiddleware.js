import jwt from "jsonwebtoken"
import User from '../models/userModel.js';


export const protect = async (req, res, next) => {
  try {
    let token = req.cookies.token; // Use let instead of const

    // If no token in cookies, check Authorization header
    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1]; // Extract from Bearer token
    }

    // ✅ Log extracted token for debugging
    console.log("Extracted Token:", token);

    if (!token) {
      return res.status(401).json({ message: "Not Authorized, no token" });
    }

    // ✅ Verify JWT Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);

    // ✅ Fetch user from database
    req.user = await User.findById(decoded.id).select("-password");

    // Proceed to next middleware
    next();
  } catch (error) {
    console.error("JWT Error:", error.message);
    return res.status(401).json({ message: "Invalid Token" });
  }
};
