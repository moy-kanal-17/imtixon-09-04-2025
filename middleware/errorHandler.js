const logger = require("./logger");

const errorHandler = (err, req, res, next) => {
  logger.error(`${err.message} | Stack: ${err.stack}`);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Serverda xatolik yuz berdi";
  res.status(statusCode).json({message});
};

module.exports = errorHandler;
