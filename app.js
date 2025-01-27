const express = require("express");
const bodyParser = require("body-parser");

const sellerRoutes = require("./routes/seller");
const buyerRoutes = require("./routes/buyer");
const errorController = require("./controllers/error");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/seller", sellerRoutes);
app.use(buyerRoutes);

app.use(errorController.get404);

app.listen(3000);
