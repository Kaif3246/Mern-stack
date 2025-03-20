import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDb from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import dashboardRoutes from "./routes/dashboardRoutes.js";
dotenv.config();
connectDb();

const app = express();
// Middleware

app.use(express.json());
app.use(cors(
  {
    origin: 'http://localhost:5173', // Adjust this to your frontend URL
    credentials: true // Allow cookies to be sent
  }
));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
  console.log(`🚀 Server is running on port ${PORT} `)
})