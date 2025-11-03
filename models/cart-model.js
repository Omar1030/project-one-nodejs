// ! Packages
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User of cart is required"],
    },
    products: {
      type: [Schema.Types.ObjectId],
      ref: "Product",
      required: [true, "Products of cart is required"],
    },
    total: {
      type: Number,
    },
  },
  { timestamps: true }
);

const cartModel = mongoose.model("Cart", cartSchema);

module.exports = cartModel;
