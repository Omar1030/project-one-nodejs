// ! Packages
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title of category is required"],
    },
    description: {
      type: String,
      required: [true, "Description of category is required"],
    },
  },
  { timestamps: true }
);

const categoryModel = mongoose.model("Category", categorySchema);

module.exports = categoryModel;
