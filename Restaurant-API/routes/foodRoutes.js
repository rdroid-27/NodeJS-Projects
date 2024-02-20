const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const {
  createFoodController,
  getAllFoodController,
  getFoodIdController,
  getFoodByRestaurantIdController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
} = require("../controllers/foodController");
const router = express.Router();

// CREATE FOOD || POST
router.post("/create", authMiddleware, createFoodController);

// GET ALL FOOD || GET
router.get("/getAll", authMiddleware, getAllFoodController);

// GET FOOD ID || GET
router.get("/get/:id", authMiddleware, getFoodIdController);

// GET FOOD By RESTAURANT ID || GET
router.get(
  "/getByRestaurant/:id",
  authMiddleware,
  getFoodByRestaurantIdController
);

// UPDATE FOOD || POST
router.post("/updateFood/:id", authMiddleware, updateFoodController);

// DELETE FOOD || DELETE
router.delete("/deleteFood/:id", authMiddleware, deleteFoodController);

// PLACE ORDER || POST
router.post("/place-order", authMiddleware, placeOrderController);

// ORDER STATUS || POST
router.post("/order-status/:id",authMiddleware, adminMiddleware, orderStatusController);

module.exports = router;
