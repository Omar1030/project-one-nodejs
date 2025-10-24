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
    decription: {
      type: String,
      required: [true, "Description of product is required"],
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
