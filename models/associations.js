const Rental = require("./rental");
const Payment = require("./payment");

const setupAssociations = () => {
  Payment.hasMany(Rental, {
    foreignKey: "payment_id",
    sourceKey: "id",
    onDelete: "CASCADE",
  });

  Rental.belongsTo(Payment, {
    foreignKey: "payment_id",
    onDelete: "SET NULL",
  });
};

module.exports = setupAssociations;
