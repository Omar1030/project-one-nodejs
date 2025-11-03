// ! Packages
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title of product is required"],
      unique: [true, "Unique title for product"],
    },
    price: {
      type: Number,
      required: [true, "Price of product is required"],
    },
    description: {
      type: String,
      required: [true, "Description of product is required"],
    },
    stock: {
      type: Number,
      required: [true, "Stock of product is required"],
    },
    images: {
      type: [String],
      required: [true, "Atleast one image of product is required"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category of product is required"],
    },
    order: {
      type: [Schema.Types.ObjectId],
      ref: "Order",
    },
    cart: {
      type: [Schema.Types.ObjectId],
      ref: "Cart",
    },
    wishlist: {
      type: [Schema.Types.ObjectId],
      ref: "Wishlist",
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
