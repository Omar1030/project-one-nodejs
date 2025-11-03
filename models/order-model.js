// ! Packages
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    user: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      required: [true, "UserIds of order is required"],
    },
    products: {
      type: [Schema.Types.ObjectId],
      ref: "Product",
      required: [true, "ProductsIds of order is required"],
    },
    status: {
      type: String,
      enum: ["pending", "shipped", "delivered", "cancelled"],
      default: "pending",
      required: [true, "Status of order is required"],
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;
