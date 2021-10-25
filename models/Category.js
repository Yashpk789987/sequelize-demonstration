module.exports = (Sequelize, DataTypes) => {
  const Category = Sequelize.define("category", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // option1

  Category.associate = (models) => {
    Category.hasMany(models.Product, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  // option2

  //   Category.associate = (models) => {
  //     Category.hasMany(models.Product, { as: "products" });
  //   };

  return Category;
};
