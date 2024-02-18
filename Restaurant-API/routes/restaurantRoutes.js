const express = require("express");
const {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantIdController,
} = require("../controllers/restaurantController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// !ROUTES

// CREATE RESTAURANT || POST
router.post("/create", authMiddleware, createRestaurantController);

// GET ALL RESTAURANT || GET
router.get("/getAll", authMiddleware, getAllRestaurantController);

// GET RESTAURANT ID || GET
router.get("/get/:id", authMiddleware, getRestaurantIdController);

// // UPDATE PASSWORD|| POST
// router.post("/updatePassword", authMiddleware, updatePasswordController);

// // RESET PASSWORD|| POST
// router.post("/resetPassword", authMiddleware, resetPasswordController);

// // RESET PASSWORD|| POST
// router.delete("/deleteUser", authMiddleware, deleteUserController);

module.exports = router;
