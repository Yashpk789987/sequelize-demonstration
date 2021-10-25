const express = require("express");

const models = require("../models");
const formatErrors = require("../utils/formatErrors");
const router = express.Router();

router.get("/create", async (_, res) => {
  try {
    // console.log(models);
    const movie = await models.Movie.create({
      name: "Ishaqzaade",
    });
    res.json(movie);
  } catch (error) {
    res.json(formatErrors(error));
  }
});

router.get("/all", async (_, res) => {
  try {
    const movies = await models.Movie.findAll({
      include: {
        model: models.Actor,
        through: {
          attributes: [],
        },
      },
    });
    res.json(movies);
  } catch (error) {
    res.json(error);
  }
});

router.get("/add-actor-movie/:actorId/:movieId", async (req, res) => {
  try {
    const { actorId, movieId } = req.params;
    console.log(req.params);
    const movie = await models.Movie.findByPk(movieId);
    if (!movie) {
      return res.send("Movie Not Found...!");
    }
    const isAdded = await movie.addActor(actorId);
    res.json({ isAdded });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

module.exports = router;
