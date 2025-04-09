const { DataTypes } = require("sequelize");
const Customer = require("./customer");
const {sequelize} = require("../config/db");

const Canceled = sequelize.define("Canceleds", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  rent_id: { type: DataTypes.BIGINT, allowNull: false },
  seller_id: { type: DataTypes.BIGINT, allowNull: false },
  customer_id: { type: DataTypes.BIGINT, allowNull: false },
});

// Canceled.hasMany(Canceled, { foreignKey: "customer_id", as: "canceledOrders" });


module.exports = Canceled;
