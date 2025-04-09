const { DataTypes } = require("sequelize");
const {sequelize} = require("../config/db");

const Contract = sequelize.define("contracts", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  rent_id: { type: DataTypes.BIGINT, allowNull: false },
  seller_id: { type: DataTypes.BIGINT, allowNull: false },
  customer_id: { type: DataTypes.BIGINT, allowNull: false },
  status: {
    type: DataTypes.ENUM("cancel","pending", "active", "completed"),
    allowNull: false,
  },
  description: { type: DataTypes.STRING, allowNull: false },
  rent_finishing_at: { type: DataTypes.TIME, allowNull: false },
});

module.exports = Contract;
