const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.js");

const Passport = sequelize.define("passport", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  number_passport: { type: DataTypes.BIGINT, allowNull: false, unique: true },
  name: { type: DataTypes.STRING, allowNull: false },
  famil: { type: DataTypes.STRING, allowNull: false },
  birthday: { type: DataTypes.STRING, allowNull: false },
  surname: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false },
  gender: { type: DataTypes.ENUM("man", "wooman"), allowNull: false },
});

module.exports = Passport;
