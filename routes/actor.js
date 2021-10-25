const express = require("express");
const { QueryTypes } = require("sequelize");

const models = require("../models");
const formatErrors = require("../utils/formatErrors");
const router = express.Router();

router.get("/create", async (_, res) => {
  try {
    // console.log(models);
    const actor = await models.Actor.create({
      name: "Shahrukh Khan",
    });
    res.json(actor);
  } catch (error) {
    res.json(formatErrors(error));
  }
});

router.get("/all", async (_, res) => {
  try {
    // const actors = await models.Actor.findAll({
    //   include: models.Movie,
    // });

    // if junction table json not needed
    const actors = await models.Actor.findAll({
      include: {
        model: models.Movie,
        through: {
          attributes: [],
        },
      },
    });
    res.json(actors);
  } catch (error) {
    res.json(error);
  }
});

router.get("/all/v1", async (_, res) => {
  try {
    // const query = `SELECT "actor"."id", "actor"."name", "actor"."created_at" AS "createdAt", "actor"."updated_at" AS "updatedAt", "movies"."id" AS "movies.id", "movies"."name" AS "movies.name", "movies"."created_at" AS "movies.createdAt", "movies"."updated_at" AS "movies.updatedAt" FROM "actors" AS "actor" LEFT OUTER JOIN ( "ActorMovie" AS "movies->ActorMovie" INNER JOIN "movies" AS "movies" ON "movies"."id" = "movies->ActorMovie"."movie_id") ON "actor"."id" = "movies->ActorMovie"."actor_id";`;
    const query = `SELECT "actor"."id", "actor"."name", "actor"."created_at" AS "createdAt", "actor"."updated_at" AS "updatedAt", "movies"."id" AS "movies.id", "movies"."name" AS "movies.name", "movies"."created_at" AS "movies.createdAt", "movies"."updated_at" AS "movies.updatedAt" FROM "actors" AS "actor" , "ActorMovie" AS "movies->ActorMovie" ,  "movies" AS "movies" where "movies"."id" = "movies->ActorMovie"."movie_id" and "movies->ActorMovie"."actor_id" = "actor"."id" ; `;
    const movies = await models.sequelize.query(query, {
      nest: true,
      type: QueryTypes.SELECT,
    });
    res.json(movies);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
