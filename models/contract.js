const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Contract = sequelize.define(
  "Contract",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true, 
      allowNull: false, 
    },
    rent_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    seller_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    customer_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("cancel", "pending", "active", "completed"),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rent_finishing_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "contracts", 
  }
);

Contract.belongsTo(require("./seller"), {
  foreignKey: "seller_id",
  as: "seller",
});
Contract.belongsTo(require("./customer"), {
  foreignKey: "customer_id",
  as: "customer",
});

// Contract.belongsTo(require("./payment"), {
//   foreignKey: "customer_id",
//   as: "customer",
// });

module.exports = Contract;
