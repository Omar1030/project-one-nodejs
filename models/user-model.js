// ! Packages
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
      type: [
        {
          city: {
            type: String,
            required: [true, "City is required"],
          },
          country: {
            type: String,
            required: [true, "Country is required"],
          },
        },
      ],
      ref: "Address",
      required: [true, "Address of user is required"],
    },
    role: {
      type: String,
      required: [true, "Set your role!"],
      enum: {
        values: ["admin", "seller", "user"],
        message: "{VALUE} is not supported as a role ",
      },
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

// ! Hash Password before saving in DB
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
