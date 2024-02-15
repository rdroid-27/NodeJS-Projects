const express = require('express');
const { getUserController,updateUserController } = require('../controllers/userController');
const authMiddleware= require('../middlewares/authMiddleware');
const router = express.Router();

// !ROUTES

// GET USER || GET
router.get('/getUser',authMiddleware,getUserController);

// UPDATE USER || POST
router.post('/updateUser',authMiddleware,updateUserController);

module.exports =router;