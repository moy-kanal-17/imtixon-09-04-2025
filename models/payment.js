
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Payment = sequelize.define(
  "Payment",
  {
    ownerId:{
      type:DataTypes.INTEGER,
      allowNull:true
    },
    userId: {
      type: DataTypes.INTEGER,
        allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.ENUM("credit_card", "paypal", "bank_transfer"),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "completed", "canceled"),
      defaultValue: "pending",
    },
    transactionId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "Payments",
    timestamps: true,
 
    
  }
);

module.exports = Payment;
