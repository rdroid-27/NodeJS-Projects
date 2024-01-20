// packages Imports
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import morgan from 'morgan';

// files import
import connectDB from './config/db.js';
import testRoutes from './routes/testRoutes.js';

// Dotenv config
dotenv.config();

//rest object
const app= express();

// port defined
const PORT = process.env.PORT || 5000;

// mongoDB connection
connectDB();

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// routes
app.use('/api/v1/',testRoutes);

app.listen(PORT, ()=>{
  console.log(`App listening in ${process.env.DEV_MODE} mode on ${PORT}`.bgWhite.green);
});