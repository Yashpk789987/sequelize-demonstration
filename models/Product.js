module.exports = (Sequelize, DataTypes) => {
  const Product = Sequelize.define("product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Product.associate = (models) => {
    Product.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false,
      },
    });
    Product.belongsToMany(models.Order, {
      through: "orderItem",
    });
  };

  return Product;
};
