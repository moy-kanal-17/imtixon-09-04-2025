const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Companiy = sequelize.define(
  "Companiy",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companiy_email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "companiy",
    timestamps: false,
  }
);

module.exports = Companiy;
