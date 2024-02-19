const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Enter food title!"],
    },
    description: {
      type: String,
      required: [true, "Enter food description!"],
    },
    price: {
      type: Number,
      required: [true, "Enter food Price!"],
    },
    foodTags: {
      type: String,
    },
    category: {
      type: String,
    },
    code: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Foods", foodSchema);
