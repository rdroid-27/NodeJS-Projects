const express= require('express');
const user=require('../controllers/userController');
const router=express.Router();
const validationToken= require('../middleware/validateTokenHandler');

router.post("/register", user.registerUser);
router.post("/login", user.loginUser);
router.get("/current", validationToken, user.currentUser);

module.exports= router;