const express = require("express");

const {
  addProduct,
  updateProduct,
  deleteProduct,
  getAnalytics,
} = require("../controllers/seller");

const router = express.Router();

router.post("/add-product", addProduct);

router.patch("/update-product", updateProduct);

router.delete("/delete-product/:prodId", deleteProduct);

router.get("/analytics", getAnalytics);

module.exports = router;
