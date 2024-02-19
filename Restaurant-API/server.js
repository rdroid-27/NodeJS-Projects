const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8000;
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");

// rest object
const app = express();

// connect Database
connectDB();

// *MIDDLEWARES
app.use(cors());
app.use(morgan("dev")); //logs every request made to the server
app.use(express.json()); //parses incoming requests with JSON payloads

// !ROUTES

//auth routes
app.use("/auth", require("./routes/auth"));
// user routes
app.use("/user", require("./routes/userRoutes"));
// restaurant routes
app.use("/restaurant", require("./routes/restaurantRoutes"));
// category routes
app.use("/category", require("./routes/categoryRoutes"));
// foods routes
app.use("/foods", require("./routes/foodRoutes"));

app.listen(PORT, () => {
  console.log(`APP LISTENING ON PORT ${PORT}`);
});
