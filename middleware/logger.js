const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({ filename: "./middleware/logs/error.log", level: "error" }), 
    new winston.transports.File({ filename: "./middleware/logs/info.log", level: "info" }), 

  ],
});

module.exports = logger;
