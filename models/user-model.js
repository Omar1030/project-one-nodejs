// ! Packages
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name of user is required"],
    },
    email: {
      type: String,
      required: [true, "Email of user is required"],
    },
    password: {
      type: String,
      required: [true, "Password of user is required"],
    },
    address: {
      type: [Schema.Types.ObjectId],
      ref: "Address",
      required: [true, "Address of user is required"],
    },
    wishlist: {
      type: Schema.Types.ObjectId,
      ref: "Wishlist",
    },
    cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
    },
    orders: {
      type: [Schema.Types.ObjectId],
      ref: "Order",
    },
    refreshToken: {
      type: [String],
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
