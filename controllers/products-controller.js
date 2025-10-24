// ! Package
const asyncHandler = require("express-async-handler");

// ! Modules
const productModel = require("../models/products-model.js");

// ! Utils
const AppError = require("../utils/AppError.js");

const getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await productModel.find({});
  res.status(200).json({ products });
});
const getProductByID = asyncHandler(async (req, res, next) => {});
const addProduct = asyncHandler(async (req, res, next) => {});
const editProduct = asyncHandler(async (req, res, next) => {});
const deleteProduct = asyncHandler(async (req, res, next) => {});

module.exports = { getAllProducts, getProductByID, addProduct, editProduct, deleteProduct };
