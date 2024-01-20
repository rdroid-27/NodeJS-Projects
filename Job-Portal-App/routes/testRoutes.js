import express from 'express';
import { testController } from '../controllers/testController.js';

// router object
const router= express.Router();

// routes
router.post('/test',testController);

export default router;