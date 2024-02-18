const express = require("express");
const {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteUserController,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// !ROUTES

// GET USER || GET
router.get("/getUser", authMiddleware, getUserController);

// UPDATE USER || POST
router.post("/updateUser", authMiddleware, updateUserController);

// UPDATE PASSWORD|| POST
router.post("/updatePassword", authMiddleware, updatePasswordController);

// RESET PASSWORD|| POST
router.post("/resetPassword", authMiddleware, resetPasswordController);

// RESET PASSWORD|| POST
router.delete("/deleteUser", authMiddleware, deleteUserController);

module.exports = router;
