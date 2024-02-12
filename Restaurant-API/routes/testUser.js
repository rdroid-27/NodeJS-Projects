const express = require('express');
const { testUserController } = require('../controllers/testUserController');
const router = express.Router();

router.get('/test-user', testUserController);
module.exports =router;