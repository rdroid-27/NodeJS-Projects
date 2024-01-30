// API Documentation
import swaggerDoc from "swagger-jsdoc";
import SwaggerUi from "swagger-ui-express";

// packages Imports
import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

// security package
import helmet from "helmet";
import MongoSanitize from "express-mongo-sanitize";

// files import
import connectDB from "./config/db.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

// routes imports
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import jobsRoute from "./routes/jobsRoute.js";

// Dotenv config
dotenv.config();

// swagger api config
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Portal Application",
      description: "NodeJS and ExpressJS based Job Portal",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const spec = swaggerDoc(options);

//rest object
const app = express();

// port defined
const PORT = process.env.PORT || 5000;

// mongoDB connection
connectDB();

// middlewares
app.use(helmet());
app.use(MongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// routes
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/job", jobsRoute);

// Home route root
app.use("/api-doc", SwaggerUi.serve, SwaggerUi.setup(spec));

// validation  middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(
    `App listening in ${process.env.DEV_MODE} mode on ${PORT}`.bgGreen.white
  );
});
