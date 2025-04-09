
const  Canceled  = require("../models/cansel");
const { Op } = require("sequelize");
const logger = require("../middleware/logger");
const errorHandler = require("../middleware/errorHandler");
const Customer = require("../models/customer");
const  Rental  = require("../models/rental");

const getcancels = async (req, res) => {
  try {
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const canceledRentals = await Canceled.findAll({
where: {
    createdAt: {
      [Op.between]: [start_date, end_date],
    }},
    });

    return res.json(canceledRentals);
  } catch (error) {
    logger.error(`Error fetching canceled rentals: ${error.message}`);
    errorHandler(error, req, res);
  }
};

const getallcancels = async (req, res) => {
    try {
        const canceledRentals = await Canceled.findAll({});
        return res.json(canceledRentals);
    }
    catch (error) {
        logger.error(`Error fetching canceled rentals: ${error.message}`);
        errorHandler(error, req, res);
    }
}

module.exports = {
  getcancels,
  getallcancels,
};