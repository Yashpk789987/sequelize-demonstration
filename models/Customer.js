module.exports = (Sequelize, DataTypes) => {
  const Customer = Sequelize.define("customer", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5, 42],
          msg: "The password length should be between 7 and 42 characters.",
        },
      },
    },
  });

  Customer.associate = (models) => {
    Customer.hasMany(models.Order, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Customer;
};
