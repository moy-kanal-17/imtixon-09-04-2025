const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Seller = require("./seller");

const Rental = sequelize.define("Rental", {
  title_rent: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  categories: {
    type: DataTypes.STRING,
  },
  discriptions: {
    type: DataTypes.STRING,
  },
  rental_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  return_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  total_price: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("ongoing", "completed", "canceled"),
    defaultValue: "ongoing",
  },
  seller_id: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
});

Rental.belongsTo(require("./seller"), {
  foreignKey: "seller_id",
  as: "seller",
});

module.exports = Rental;
