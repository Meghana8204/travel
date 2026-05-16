import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import connectDB from './db/connectDB.js';
import { validateEnv } from './config/env.js';

import userRoutes from './routes/routes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

import { v2 as cloudinary } from 'cloudinary';


// ================= CONFIG =================

// Load Environment Variables
dotenv.config();
validateEnv();

// Initialize Express
const app = express();


// ================= CLOUDINARY =================

cloudinary.config({
    cloud_name:
        process.env.CLOUDINARY_CLOUD_NAME,

    api_key:
        process.env.CLOUDINARY_API_KEY,

    api_secret:
        process.env.CLOUDINARY_API_SECRET
});


// ================= MIDDLEWARE =================

// CORS
app.use(
    cors({
        origin: [
            'http://localhost:5173',
            'http://localhost:5174',
            'http://localhost:5175'
        ],
        credentials: true
    })
);

// Body Parser
app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);


// ================= STATIC FILES =================

// Serve Uploaded Files
app.use(
    '/uploads',
    express.static(
        path.join(process.cwd(), 'uploads')
    )
);


// ================= ROUTES =================

app.use('/', userRoutes);

app.use('/', dashboardRoutes);

app.use('/', bookingRoutes);


// ================= DATABASE =================

connectDB(process.env.CONNECTDB);


// ================= SERVER =================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(
        `Server running on:
http://localhost:${PORT}`
    );
});
