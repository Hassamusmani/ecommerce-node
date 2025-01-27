const express = require("express");

const {
  getProducts,
  getProductById,
  getProductByQuery,
  addToCart,
  checkout,
  buyProducts,
} = require("../controllers/buyer");

const router = express.Router();

router.get("/get-products", getProducts);

router.get("/get-by-id", getProductById);

router.get("/search-products", getProductByQuery);

router.post("/add-to-cart", addToCart);

router.get("/checkout", checkout);

router.post("/buy", buyProducts);

module.exports = router;
