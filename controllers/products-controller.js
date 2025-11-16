const asyncHandler = require("express-async-handler");

const productModel = require("../models/products-model.js");

const AppError = require("../utils/AppError.js");

// ! @desc    Get all products
// ! @route   GET /api/products
// ! @access  Public
const getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await productModel.find({});
  res.status(200).json({ products });
});

// ! @desc    Get product by ID
// ! @route   GET /api/products/:id
// ! @access  Public
const getProductByID = asyncHandler(async (req, res, next) => {});

// ! @desc    Add product
// ! @route   POST /api/products
// ! @access  Private
const addProduct = asyncHandler(async (req, res, next) => {});

// ! @desc    Edit product
// ! @route   PATCH /api/products/:id
// ! @access  Private
const editProduct = asyncHandler(async (req, res, next) => {});

// ! @desc    Delete product
// ! @route   DELETE /api/products/:id
// ! @access  Private
const deleteProduct = asyncHandler(async (req, res, next) => {});

module.exports = { getAllProducts, getProductByID, addProduct, editProduct, deleteProduct };
