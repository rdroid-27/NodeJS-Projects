// packages Imports
import express from "express";
import 'express-async-errors';
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

// files import
import connectDB from "./config/db.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

// routes imports
import authRoute from "./routes/authRoute.js";

// Dotenv config
dotenv.config();

//rest object
const app = express();

// port defined
const PORT = process.env.PORT || 5000;

// mongoDB connection
connectDB();

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// routes
app.use("/auth", authRoute);

// validation  middleware
app.use(errorMiddleware);


app.listen(PORT, () => {
  console.log(
    `App listening in ${process.env.DEV_MODE} mode on ${PORT}`.bgGreen.white
  );
});
