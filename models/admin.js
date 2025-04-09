const { DataTypes } = require("sequelize");
const {sequelize} = require("../config/db.js");

const Admin = sequelize.define("admin", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  password: { type: DataTypes.STRING, allowNull: false },
  full_name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  accessToken: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
    refreshToken: {  
      type: DataTypes.STRING,
      allowNull: true,
    },
  role: {
    type: DataTypes.ENUM("creator", "admin"),
    allowNull: false,
  },
});

module.exports = Admin;
