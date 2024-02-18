const mongoose = require("mongoose");

const restaurantModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Enter restaurant title"],
    },
    imageUrl: {
      type: String,
      default: "",
    },
    foods: {
      type: Array,
    },
    time: {
      type: String,
    },
    pickUp: {
      type: Boolean,
      default: true,
    },
    delivery: {
      type: Boolean,
      default: true,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    logoUrl: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: String,
    },
    code: {
      type: String,
    },
    coords: {
      id: { type: String },
      lat: { type: String },
      lng: { type: String },
      latDelta: { type: String },
      lngDelta: { type: String },
      address: { type: String },
      title: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Restaurant", restaurantModel);
