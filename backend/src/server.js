import express from 'express';
import mongoose, { connect } from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoute.js'; 
import { connectDB } from './lib/db.js';
import { ENV } from './lib/env.js';


dotenv.config();

const app = express();


// Middleware
app.use(cors({
    origin:["http://localhost:5173",ENV.FRONTEND_URL],
    credentials:true
})); 

app.use(express.json()); 

// Routes
app.use('/api/tasks', taskRoutes);

const startSever=async()=>{
    try{
        await connectDB();
        app.listen(ENV.PORT,()=>{
            console.log(`server is running on ${ENV.PORT}`);
        })
    }
    catch(err){
        console.log("Server Error",err);
    }
}
startSever();