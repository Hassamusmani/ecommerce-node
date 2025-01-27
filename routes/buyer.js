const express = require("express");

const {
  getProducts,
  getProductById,
  getProductsByQuery,
  addToCart,
  checkout,
  buyProducts,
} = require("../controllers/buyer");

const router = express.Router();

router.get("/get-products", getProducts);

router.get("/get-products/:prodId", getProductById);

router.get("/search-products", getProductsByQuery);

router.post("/add-to-cart", addToCart);

router.post("/checkout", checkout);

router.post("/buy", buyProducts);

module.exports = router;
