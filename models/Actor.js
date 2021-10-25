module.exports = (Sequelize, DataTypes) => {
  const Actor = Sequelize.define("actor", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Actor.associate = (models) => {
    Actor.belongsToMany(models.Movie, {
      through: { model: "ActorMovie" },
    });
  };

  return Actor;
};
