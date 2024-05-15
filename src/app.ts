
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import authRoutes from './routes/authRoutes';
import usersRoutes from './routes/usersRoutes';
import markerRoutes from './routes/markerRoutes';
import cors from 'cors';

const app = express();
app.use(cors({credentials:true, origin:"http://localhost:5173"}))
app.use (express.json());

//Routes
app.use('/auth',authRoutes)
app.use ('/users',usersRoutes)
app.use ('/marker',markerRoutes)


export default app