exports.get404 = (req, res, next) => {
  res.status(404).send({ message: "404: Not found :(" });
};
