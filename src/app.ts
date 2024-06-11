
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import authRoutes from './routes/authRoutes';
import usersRoutes from './routes/usersRoutes';
import markerRoutes from './routes/markerRoutes';
import routRoutes from './routes/routRoutes';
import activityRoutes from './routes/activity_markerRoutes';
import cors from 'cors';

const app = express();
app.use(cors({credentials:true, origin:"http://localhost:5173"}))
app.use (express.json());

//Routes
app.use('/auth',authRoutes)
app.use ('/users',usersRoutes)
app.use ('/marker',markerRoutes)
app.use ('/route',routRoutes)
app.use ('/activity',activityRoutes)


export default app