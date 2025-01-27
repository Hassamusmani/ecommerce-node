const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  const products = Product.getProducts();
  res.status(200).send(products);
};

exports.getProductById = (req, res, next) => {
  const { prodId } = req.params;
  const product = Product.getById(prodId);

  if (!product) {
    return res.status(400).send({ message: "product not found" });
  }

  res.status(200).send(product);
};

exports.getProductsByQuery = (req, res, next) => {
  const { search } = req.query;

  const queriedProducts = Product.getByQuery(search.toLowerCase());

  if (!queriedProducts) {
    return res.status(400).send({ message: "product not found" });
  }

  res.status(200).send(queriedProducts);
};

exports.addToCart = (req, res, next) => {
  const { id, quantity } = req.body;

  if (!id || !quantity) {
    return res.status(400).send({ message: "Bad Request" });
  }

  if (!Product.getProductAvailability(id)) {
    return res.status(400).send({ message: "product not found" });
  }

  if (!Product.getStockAvailability(id, quantity)) {
    return res.status(400).send({ message: "we are out of stock" });
  }

  res.status(200).send({ message: "product added to cart" });
};

exports.checkout = (req, res, next) => {
  const { items } = req.body;

  if (!items?.length) {
    return res.status(400).send({ message: "Bad Request" });
  }

  const checkoutProducts = Product.getCheckoutItems(items);
  res.status(200).send(checkoutProducts);
};

exports.buyProducts = (req, res, next) => {
  const { items } = req.body;

  if (!items?.length) {
    return res.status(400).send({ message: "Bad Request" });
  }

  if (!Product.buy(items)) {
    return res
      .status(400)
      .send({ message: "product not found or we are out of stock" });
  }

  res.status(201).send({ message: "Success" });
};
