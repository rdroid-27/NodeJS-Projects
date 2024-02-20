const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    foods: [{type: mongoose.Schema.Types.ObjectId,
      ref: 'Foods',
    }],
    payment: {},
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'User'
    },
    status: {
      type: String,
      eum:["Preparing","Prepared","On the way", "Delivered"],
      default:"Preparing"
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Orders", orderSchema);
