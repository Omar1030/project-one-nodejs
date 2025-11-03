// ! Packages
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "UserId of review is required"],
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "ProductId of review is required"],
    },
    comment: {
      type: String,
      required: [true, "Comment of review is required"],
    },
  },
  { timestamps: true }
);

const reviewModel = mongoose.model("Review", reviewSchema);

module.exports = reviewModel;
