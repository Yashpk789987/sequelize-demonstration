const Sequelize = require("sequelize");
const fs = require("fs");
const path = require("path");

const __DB__ =
  "postgres://iomjriovzdruzn:23d53e8c819170e5ab698472aac0163ecc8b38f668336a167c30f18b5e391294@ec2-3-220-222-72.compute-1.amazonaws.com:5432/debdsdmonteid4";

// const db = {};
const basename = path.basename(__filename);

const sequelize = new Sequelize(__DB__, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  define: {
    underscored: true,
  },
  logging: process.env.NODE_ENV === "development" ? console.log : false,
});

// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
//     );
//   })
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file))(
//       sequelize,
//       Sequelize.DataTypes
//     );
//     db[model.name] = model;
//   });

const db = {
  Actor: require("./Actor")(sequelize, Sequelize.DataTypes),
  Movie: require("./Movie")(sequelize, Sequelize.DataTypes),
};

Object.keys(db).forEach((modelName) => {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
