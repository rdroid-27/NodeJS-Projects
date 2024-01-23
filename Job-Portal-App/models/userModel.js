import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: [true, "Email already registered!"],
      required: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      minlength:[6,"Password length should be grater than 6 characters!"]
    },
    location: {
      type: String,
      default: "India",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
