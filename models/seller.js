const { DataTypes } = require("sequelize");
const {sequelize} = require("../config/db");

const Seller = sequelize.define("seller", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  full_name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  company_id: { type: DataTypes.BIGINT, allowNull: true },
  start_work_at: { type: DataTypes.STRING, allowNull: true },
  accessToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  refreshToken: {
    type: DataTypes.STRING, 
    allowNull: true,
  },
});

module.exports = Seller;
