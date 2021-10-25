const express = require("express");
const models = require("../models");
const formatErrors = require("../utils/formatErrors");
const router = express.Router();

router.get("/me", (_, res) => {
  res.json({ id: 1, name: "yash" });
});

router.get("/create", async (_, res) => {
  try {
    // console.log(models);
    const admin = await models.Admin.create({
      name: "yash",
      email: "yashpk21284555@gmail.com",
      password: "145454",
    });
    res.json(admin);
  } catch (error) {
    res.json(formatErrors(error));
  }
});

router.get("/all", async (_, res) => {
  try {
    const admins = await models.Admin.findAll();
    res.json(admins);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
