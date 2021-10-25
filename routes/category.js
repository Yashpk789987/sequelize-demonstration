const express = require("express");
const models = require("../models");
const formatErrors = require("../utils/formatErrors");
const router = express.Router();

router.get("/create", async (_, res) => {
  try {
    // console.log(models);
    const category = await models.Category.create({
      name: "mobiles",
    });
    res.json(category);
  } catch (error) {
    res.json(formatErrors(error));
  }
});

// option1

router.get("/all", async (_, res) => {
  try {
    const categories = await models.Category.findAll({
      include: { model: models.Product, attributes: ["name"] },
    });
    res.json(categories);
  } catch (error) {
    res.json(error);
  }
});

//  option2

// router.get("/all", async (_, res) => {
//   try {
//     const categories = await models.Category.findAll({
//       include: "products",
//     });
//     res.json(categories);
//   } catch (error) {
//     res.json(error);
//   }
// });

module.exports = router;
