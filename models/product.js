module.exports = class Product {
  static products = [];

  constructor({ id, name, description, price, image, stock }) {
    this.id = id.toISOString();
    this.name = name;
    this.description = description;
    this.price = price;
    this.image = image;
    this.stock = stock;
  }

  // seller methods
  addProduct() {
    Product.products.push(this);
    return this.id;
  }

  static updateProduct(prod) {
    const index = Product.products.findIndex((pro) => pro.id === prod.id);
    Product.products[index] = prod;
  }

  static deleteProduct(id) {
    const index = Product.products.findIndex((pro) => pro.id === id);
    Product.products.splice(index, 1);
  }

  static getAnalytics() {
    return Product.products.map(({ name, stock }) => ({ name, stock }));
  }

  // buyer methods
  static getProducts() {
    return Product.products;
  }

  static getById(id) {
    return Product.products.find((prod) => prod.id === id);
  }

  static getByQuery(query) {
    return Product.products.filter((prod) =>
      prod.name.toLowerCase().includes(query)
    );
  }

  static getProductAvailability(prodId) {
    return Product.products.some(({ id }) => id == prodId);
  }

  static getStockAvailability(prodId, quantity) {
    return Product.products.some(
      ({ id, stock }) => id == prodId && stock >= quantity
    );
  }

  static getCheckoutItems(items) {
    const checkoutProducts = items.map(({ id, quantity }) => {
      const filteredProduct = Product.products.find((prod) => prod.id === id);
      const { stock, ...restItems } = filteredProduct;
      return { ...restItems, quantity };
    });
    return checkoutProducts;
  }

  static buy(items) {
    const checkProductsInInventory = items.every(({ id, quantity }) => {
      if (!Product.getProductAvailability(id)) return false;
      if (!Product.getStockAvailability(id, quantity)) return false;

      return true;
    });

    if (checkProductsInInventory) {
      Product.products = Product.products.map((prod) => {
        const filteredItem = items.find(({ id }) => id === prod.id);
        return filteredItem && prod.id === filteredItem.id
          ? { ...prod, stock: prod.stock - filteredItem.quantity }
          : prod;
      });

      return true;
    }

    return false;
  }
};
