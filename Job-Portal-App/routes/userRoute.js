import express from 'express';
import userAuth from '../middlewares/authMiddleware.js';
import { updateUserController } from '../controllers/updateUserController.js';

const router= express.Router();

// routes


// Update User || PUT
router.put('/update-user',userAuth,updateUserController);




export default router;