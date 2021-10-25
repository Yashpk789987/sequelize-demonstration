const express = require("express");
const app = express();
const models = require("./models");
const port = 3000 || process.env.PORT;

const ActorRouter = require("./routes/actor");
const MovieRouter = require("./routes/movie");

app.use("/actor", ActorRouter);
app.use("/movie", MovieRouter);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

async function syncdb() {
  try {
    await models.sequelize.sync({ force: false, alter: false });
    console.log("db connected");
  } catch (error) {
    console.log(error, "db connected error");
  }
}

syncdb();
