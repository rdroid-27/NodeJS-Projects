const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser= require('body-parser');
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const path= require('path');

const connectDB= require('./server/database/connection');

// log requests
app.use(morgan('tiny'));

// MONGODB Connection
connectDB();

// parse request to body parser
app.use(bodyParser.urlencoded({encoded: true}));

// set view engine
app.set("view engine", "ejs");

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));


// load router
app.use('/', require('./server/routes/router'));

app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`);
});
