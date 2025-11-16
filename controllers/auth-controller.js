const expressAsyncHandler = require("express-async-handler");
const AppError = require("../utils/AppError.js");

const userModel = require("../models/user-model.js");

// ! @desc
// ! @route /api/auth/register
// ! @access { private }
const registerController = expressAsyncHandler(async (req, res, next) => {
  const { name, email, password, city, country, role } = req.body;
  if (!name | !email | !password | !city | !country) return next(new AppError("Missing fields!", 400));
  const newUser = await userModel.create({ name, email, password, address: { city, country }, role });
  if (!newUser) return next(new AppError("Register process is failed!", 500));
  res.status(201).json({ "New User": newUser });
});

module.exports = { registerController };
