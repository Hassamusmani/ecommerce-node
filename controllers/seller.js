const Product = require("../models/product");

exports.addProduct = (req, res, next) => {
  const { name, price, stock } = req.body;

  if (!name || !price || !stock) {
    return res.status(400).send({ message: "Bad Request!" });
  }

  const productData = {
    id: new Date(),
    ...req.body,
  };

  const product = new Product(productData);
  product.addProduct();

  res
    .status(201)
    .send({ id: product.id, message: "product Added successfully" });
};

exports.updateProduct = (req, res, next) => {};

exports.deleteProduct = (req, res, next) => {};

exports.getAnalytics = (req, res, next) => {
  const analytics = Product.getAnalytics();
  res.status(200).send(analytics);
};
