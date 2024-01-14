const express= require('express');
const bodyParser = require("body-parser");
const app= express();
require('dotenv').config();
require('./db');
const taskRoutes= require('./routes/taskRoute');
const PORT= process.env.PORT || 8000;
app.use(bodyParser.json());


app.use('/users',require('./routes/userRoute'));
app.use('/tasks',require('./routes/taskRoute'));

app.get('/',(req,res)=>{
  res.json({
    message: "Task manager api working"
  });
})

app.listen(PORT, ()=>{
  console.log(`App is running on port : ${PORT}`);
})