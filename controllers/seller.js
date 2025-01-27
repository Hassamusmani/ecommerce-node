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

exports.updateProduct = (req, res, next) => {
  const { id, keyValuePairs } = req.body;

  if (!id || !keyValuePairs || Object.keys(keyValuePairs).length === 0) {
    return res.status(400).send({ message: "Bad Request!" });
  }

  const product = Product.getById(id);
  if (!product) {
    return res.status(400).send({ message: "no product updated" });
  }

  for (const key in keyValuePairs) {
    product[key] = keyValuePairs[key];
  }

  Product.updateProduct(product);

  res.status(201).send({ message: "product updated successfully" });
};

exports.deleteProduct = (req, res, next) => {
  const { prodId } = req.params;

  if (!Product.getProductAvailability(prodId)) {
    return res.status(400).send({ message: "Bad Request!" });
  }

  Product.deleteProduct(prodId);

  res.status(201).send({ message: "product deleted successfully" });
};

exports.getAnalytics = (req, res, next) => {
  const analytics = Product.getAnalytics();
  res.status(200).send(analytics);
};
