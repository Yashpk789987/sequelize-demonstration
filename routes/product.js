const express = require("express");
const models = require("../models");
const formatErrors = require("../utils/formatErrors");
const router = express.Router();

router.get("/create", async (_, res) => {
  try {
    // console.log(models);
    const product = await models.Product.create({
      name: "Dell Laptop",
      categoryId: 2,
    });
    res.json(product);
  } catch (error) {
    res.json(formatErrors(error));
  }
});

router.get("/all", async (_, res) => {
  try {
    const products = await models.Product.findAll({
      include: models.Category,
    });

    // another option

    // const products = await models.Product.findAll({
    //   include: { association: "category", attributes: ["name"] },
    // });

    // another option

    // const products = await models.Product.findAll({
    //   include: "category"
    // });

    res.json(products);
  } catch (error) {
    res.json(error);
  }
});

router.get("/delete/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const deleted = await models.Product.destroy({ where: { id: productId } });
    res.json({ deleted });
  } catch (error) {
    res.json(formatErrors(error));
  }
});

module.exports = router;
