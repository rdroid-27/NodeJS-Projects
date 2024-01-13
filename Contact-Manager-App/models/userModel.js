const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide your username"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: [true, "Email address already taken!"],
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);
