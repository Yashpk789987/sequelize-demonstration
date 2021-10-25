const express = require("express");
const models = require("../models");
const formatErrors = require("../utils/formatErrors");
const router = express.Router();

router.get("/create", async (_, res) => {
  try {
    // console.log(models);
    const customer = await models.Customer.create({
      name: "Akhilesh",
      email: "akhilesh2128@gmail.com",
      password: "12345",
    });
    res.json(customer);
  } catch (error) {
    res.json(formatErrors(error));
  }
});

router.get("/all", async (_, res) => {
  try {
    const customers = await models.Customer.findAll();
    res.json(customers);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
