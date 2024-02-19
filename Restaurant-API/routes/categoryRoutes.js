const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createCatController,
  getAllCatController,
  updateCatController,
  deleteCatController,
} = require("../controllers/categoryController");
const router = express.Router();

// CREATE CATEGORY || POST
router.post("/create", authMiddleware, createCatController);

// GET ALL CATEGORY || GET
router.get("/getAll", authMiddleware, getAllCatController);

// UPDATE CATEGORY || POST
router.post("/updateCategory/:id", authMiddleware, updateCatController);

// DELETE CATEGORY || DELETE
router.delete("/deleteCategory/:id", authMiddleware, deleteCatController);

module.exports = router;
