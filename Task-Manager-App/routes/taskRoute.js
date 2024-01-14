const express= require('express');
const User= require('../models/tasks');
const router= express.Router();

router.get('/',(req,res)=>{
  res.send('tasks routes is working')
});

// CRUD tasks
module.exports= router;