// ! Packages
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wishlistSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "UserID of wishlist is required"],
    },
    products: {
      type: [Schema.Types.ObjectId],
      ref: "Product",
      required: [true, "ProductsID of wishlist is required"],
    },
  },
  { timestamps: true }
);

const wishlistModel = mongoose.model("wishlist", wishlistSchema);

module.exports = wishlistModel;
