const { Sequelize } = require("sequelize");
const config = require("config");

const sequelize = new Sequelize(
  config.get("db_name"),
  config.get("db_username"),
  config.get("db_password"),
  {
    host: config.get("db_host"),
    dialect: "postgres",
    logging: false,
  }
);

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL bog'landi!");
  } catch (error) {
    console.error("Xatolik:", error);
  }
}


async function syncDatabase() {
  try {
    await sequelize.sync({ alter: true }); /* { force: true } -- qima!! hama malumotni ochiradii!!!! */
    console.log("Barcha jadvallar yaratildi!");
  } catch (error) {
    console.error("DB yaratishda xatolik:", error);
  }
}

syncDatabase();



module.exports = { sequelize, connectDB ,syncDatabase};
