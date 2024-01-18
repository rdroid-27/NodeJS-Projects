const mongoose = require("mongoose");
let schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, lowercase: true, required: true },
  gender: String,
  status: String,
});

const User = mongoose.model("User", schema);
module.exports = User;
