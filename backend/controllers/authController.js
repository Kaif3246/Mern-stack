import User from "../models/userModel.js";
import { generateAccessToken,generateRefreshToken } from "../utils/generateToken.js";


export const register = async (req,res) => {
      const {name, email, password} = req.body;

      const userExits = await User.findOne({email});
      if(userExits) return res.status(400).json({message:"User Already Exits"});

      const user =  await User.create({name, email, password});

      if(user) {
        res.status(201).json({message:"User registered please verify your email."})

      }
      else{
        res.status(400).json({message:"Invalid User Data"})
      }
} 
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  if (!user.isVerified) {
    return res.status(401).json({ message: "Please verify your email first" });
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.cookie("token", accessToken, { httpOnly: true });
  res.cookie("refreshToken", refreshToken, { httpOnly: true });

  // 🔹 Send token to frontend
  res.json({ 
    message: "Logged in successfully",
    token: accessToken,  // ✅ Send token to frontend
    user: { id: user._id, name: user.name, email: user.email }
  });
};


export const logout = (req, res) => {
  res.clearCookie("token");
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out" });
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};