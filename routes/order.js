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
    await models.OrderItem.bulkCreate([
      {
        quantity: 100,
        productId: 2,
        orderId: order.id,
      },
      { quantity: 50, productId: 1, orderId: order.id },
    ]);
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
          as: "products",
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

router.get("/all/v2", async (_, res) => {
  try {
    const orders = await models.Order.findAll({
      include: [
        models.Customer,
        {
          model: models.Product,
          as: "products",
          through: {
            attributes: ["quantity"],
            as: "details",
          },
        },
      ],
    });
    res.json(orders);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
