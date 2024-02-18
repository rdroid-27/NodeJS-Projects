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

// test route
app.use("/test", require("./routes/testUser"));
//auth routes
app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/userRoutes"));
app.use("/restaurant", require("./routes/restaurantRoutes"));

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.listen(PORT, () => {
  console.log(`APP LISTENING ON PORT ${PORT}`);
});
