import { ENV } from "./env.js";
import mongoose from "mongoose";
export const connectDB = async () => {
    try {
        await mongoose.connect(ENV.MONGO_URL);
        console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection error:", err.message);
        process.exit(1); // Exit process with failure
    }
};