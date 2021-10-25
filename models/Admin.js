module.exports = (Sequelize, DataTypes) => {
  const Admin = Sequelize.define("admin", {
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

  // Admin.addHook("beforeCreate", async (admin) => {
  //   // eslint-disable-next-line no-param-reassign
  //   admin.password = await argon.hash(admin.password);
  // });

  return Admin;
};
