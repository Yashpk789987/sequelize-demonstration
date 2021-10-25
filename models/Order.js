module.exports = (Sequelize, DataTypes) => {
  const Order = Sequelize.define("order", {
    totalPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "order placed",
    },
  });

  Order.associate = (models) => {
    Order.belongsTo(models.Customer, {
      foreignKey: {
        allowNull: false,
      },
    });

    Order.belongsToMany(models.Product, {
      through: "orderItem",
    });
  };

  return Order;
};
