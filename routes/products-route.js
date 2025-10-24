// ! Package
const express = require("express");

const { getAllProducts, getProductByID, addProduct, editProduct, deleteProduct } = require("../controllers/products-controller.js");

const router = express.Router();
router.get("/", getAllProducts);
router.get("/:id", getProductByID);
router.post("/add", addProduct);
router.patch("/edit", editProduct);
router.delete("/delete", deleteProduct);

module.exports = router;
