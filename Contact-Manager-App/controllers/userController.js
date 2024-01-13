const asyncHandler = require("express-async-Handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { Error } = require("mongoose");

// @desc Register a User
// @route POST /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !password || !email) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already exists!");
  }
  // Hash password
  const hashedPass = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPass,
  });
  console.log(`User created ${user}`);
  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("User data not valid");
  }
  res.json({ message: "register User" });
});

// @desc Login a User
// @route POST /api/users
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const user = await User.findOne({ email });
  // compare password with hash password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Wrong Credentials");
  }
});

// @desc Current User
// @route GET /api/users/current
// @access  private
const currentUser = asyncHandler((req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
