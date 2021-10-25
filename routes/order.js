const express = require("express");
const models = require("../models");
const formatErrors = require("../utils/formatErrors");
const router = express.Router();

router.get("/create", async (_, res) => {
  try {
    // console.log(models);
    const order = await models.Order.create({
      totalPrice: 1400,
      customerId: 1,
    });
    order.addProducts([10, 11]);
    res.json(order);
  } catch (error) {
    res.json(formatErrors(error));
  }
});

router.get("/all", async (_, res) => {
  try {
    const orders = await models.Order.findAll({
      include: [
        models.Customer,
        {
          model: models.Product,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

module.exports = router;
