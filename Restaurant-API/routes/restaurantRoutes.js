const express = require("express");
const {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantIdController,
  deleteRestaurantController
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

// DELETE RESTAURANT ID || GET
router.delete("/delete/:id", authMiddleware, deleteRestaurantController);

module.exports = router;
