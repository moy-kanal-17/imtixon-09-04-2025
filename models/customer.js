const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Passport = require("./passport");
const Canceled = require("./cansel");

const Customer = sequelize.define("customer", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  full_name: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  address: { type: DataTypes.STRING, allowNull: false },
  passport_id: { type: DataTypes.BIGINT, allowNull: false },
  accessToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Customer.belongsTo(Passport, {
  foreignKey: "passport_id",
  as: "passport", 
});

// Customer.hasMany(Canceled, { foreignKey: "customer_id", as: "forigen" });



  
module.exports = Customer;
