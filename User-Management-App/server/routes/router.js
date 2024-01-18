const express = require("express");
const router = express.Router();
const controller= require('../controller/controller');
const services= require('../services/render');

/** 
* @description Root route
* @method GET
*/
router.get("/", services.homeRoutes);

/** 
* @description Add User
* @method GET /add-user
*/
router.get("/add-user", services.add_user);

/** 
* @description Update User
* @method GET /update-user
*/
router.get("/update-user",services.update_user);


// API
router.post('/api/users',controller.create);
router.get('/api/users',controller.find);
router.put('/api/users/:id',controller.update);
router.delete('/api/users/:id',controller.delete);

module.exports = router;
