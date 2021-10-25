const express = require("express");
const app = express();
const models = require("./models");
const port = 3000 || process.env.PORT;

const AdminRouter = require("./routes/admin");
const CategoryRouter = require("./routes/category");
const ProductRouter = require("./routes/product");
const CustomerRouter = require("./routes/customer");
const OrderRouter = require("./routes/order");

app.use("/admin", AdminRouter);
app.use("/category", CategoryRouter);
app.use("/product", ProductRouter);
app.use("/customer", CustomerRouter);
app.use("/order", OrderRouter);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

async function syncdb() {
  try {
    await models.sequelize.sync({ force: false, alter: false });
    // await models.Product.destroy({ truncate: true });
    console.log("db connected");
  } catch (error) {
    console.log(error, "db connected error");
  }
}

syncdb();
