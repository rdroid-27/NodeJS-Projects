const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "User Name is required!"],
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
    },
    phone: {
      type: String,
      required: [true, "Phone Number is required!"],
    },
    address: {
      type: String,
    },
    userType: {
      type: String,
      required: [true, "User Type is required!"],
      default: "client",
      enum: ["client", "admin", "vendor", "driver"],
    },
    profile: {
      type: String,
      default:
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn-icons-png.flaticon.com%2F512%2F2919%2F2919906.png&tbnid=-2_PruTRbmu_eM&vet=12ahUKEwjE2LWMh6aEAxXR-DgGHZwEDHAQMygTegUIARCdAQ..i&imgrefurl=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fprofile_2919906&docid=rAZ70I7-ZVk9cM&w=512&h=512&q=profile&ved=2ahUKEwjE2LWMh6aEAxXR-DgGHZwEDHAQMygTegUIARCdAQ",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
