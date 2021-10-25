module.exports = (Sequelize, DataTypes) => {
  const Movie = Sequelize.define("movie", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Movie.associate = (models) => {
    Movie.belongsToMany(models.Actor, {
      through: { model: "ActorMovie" },
    });
  };

  return Movie;
};
