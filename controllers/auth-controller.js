const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

// ! @desc
// ! @route /api/auth/login
// ! @access { private }
const loginController = expressAsyncHandler(async (req, res, next) => {
  const { email, password, deviceID } = req.body;
  if (!email | !password | !deviceID) return next(new AppError("Missing fields!"));

  const user = await userModel.findOne({ email });
  if (!user) return next(new AppError("User is not exist!", 404));

  const checkPass = await bcrypt.compare(password, user.password);
  if (!checkPass) return next(new AppError("Wrong Password!"));

  const accessToken = jwt.sign({ name: user.name, role: user.role, email }, process.env.ACCESS_SECRET, { expiresIn: "1h" });
  const refreshToken = jwt.sign({ name: user.name, role: user.role, email }, process.env.REFRESH_SECRET, { expiresIn: "1d" });
  const hashRefresh = await bcrypt.hash(refreshToken, 10);

  const targetDevice = user.refreshTokens.find((t) => t.deviceID === deviceID);

  targetDevice ? (targetDevice.token = hashRefresh) : user.refreshTokens.push({ deviceID, token: hashRefresh });
  await user.save();

  res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 1000 * 24 * 50 * 50 * 50 });
  res.status(200).json({ user: user, accessToken: accessToken });
});

module.exports = { registerController, loginController };
