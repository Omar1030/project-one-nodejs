const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const AppError = require("../utils/AppError.js");
const userModel = require("../models/user-model.js");

// ! @desc
// ! @route /api/auth/register
// ! @params { name, email, password, city, country, role }
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
// ! @params { email, password, deviceID }
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

  res.cookie("refjwt", refreshToken, { httpOnly: true, maxAge: 1000 * 24 * 50 * 50 * 50 });
  res.status(200).json({ user: user, accessToken: accessToken, refreshToken: refreshToken });
});

// ! @desc
// ! @route /api/auth/logout
// ! @params { deviceID }
// ! @token { refjwt }
// ! @access { private }
const logoutController = expressAsyncHandler(async (req, res, next) => {
  const { deviceID } = req.body;
  if (!deviceID) return next(new AppError("ID of device is missing!", 400));

  const { refjwt } = req.cookies;
  if (!refjwt) return next(new AppError("Token is not found!", 400));
  const decode = jwt.verify(refjwt, process.env.REFRESH_SECRET);

  const user = await userModel.findOne({ name: decode.name });
  if (!user) return next(new AppError("User is not exist!", 404));

  user.refreshTokens = user.refreshTokens.filter((t) => t.deviceID !== deviceID);
  await user.save();

  res.status(200).json({ success: "Logout" });
});

// ! @desc
// ! @route /api/auth/logoutall
// ! @token { refjwt }
// ! @access { private }
const logoutAllController = expressAsyncHandler(async (req, res, next) => {
  const { refjwt } = req.cookies;
  if (!refjwt) return next(new AppError("Token is not found!", 400));
  const decode = jwt.verify(refjwt, process.env.REFRESH_SECRET);

  const user = await userModel.findOne({ name: decode.name });
  if (!user) return next(new AppError("User is not exist!", 404));

  user.refreshTokens = [];
  await user.save();

  res.status(200).json({ success: "Logout from all devices!" });
});

module.exports = { registerController, loginController, logoutController, logoutAllController };
