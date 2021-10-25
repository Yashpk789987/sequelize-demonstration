module.exports = (Sequelize, DataTypes) => {
  const OrderItem = Sequelize.define("orderItem", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: "products",
        key: "id",
      },
    },
    orderId: {
      type: DataTypes.INTEGER,
      references: {
        model: "orders",
        key: "id",
      },
    },
  });

  return OrderItem;
};
