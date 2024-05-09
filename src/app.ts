
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import authRoutes from './routes/authRoutes';
import usersRoutes from './routes/usersRoutes';
import markerRoutes from './routes/markerRoutes';

const app = express();
app.use (express.json());

//Routes
app.use('/auth',authRoutes)
app.use ('/users',usersRoutes)
app.use ('/marker',markerRoutes)


export default app