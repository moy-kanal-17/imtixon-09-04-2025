const Passport = require("../models/passport");
const logger = require("../middleware/logger");
const errorHandler = require("../middleware/errorHandler");

const createPassport = async (req, res) => {
  try {
    const { number_passport, name, famil, birthday, surname, address, gender } =
      req.body;

    const passport = await Passport.create({
      number_passport,
      name,
      famil,
      birthday,
      surname,
      address,
      gender,
    });

    logger.info(`Passport yaratildi: ${passport.id}`);
    res.status(201).json({ message: "Passport yaratildi", passport });
  } catch (error) {
    logger.error(`Error creating passport: ${error.message}`);
    errorHandler(error, req, res);
  }
};

const getAllPassports = async (req, res) => {
  try {
    const passports = await Passport.findAll();
    logger.info(`Passports ro'yxati: ${passports.length} ta passport`);
    res.status(200).json(passports);
  } catch (error) {
    logger.error(`Error fetching passports: ${error.message}`);
    errorHandler(error, req, res);
  }
};

const getPassportById = async (req, res) => {
  try {
    const { id } = req.params;
    const passport = await Passport.findByPk(id);

    if (!passport) {
      const error = new Error("Passport topilmadi");
      error.status = 404;
      throw error;
    }

    logger.info(`Passport topildi: ${passport.id}`);
    res.status(200).json(passport);
  } catch (error) {
    logger.error(`Error fetching passport by ID: ${error.message}`);
    errorHandler(error, req, res);
  }
};

const updatePassport = async (req, res) => {
  try {
    const { id } = req.params;
    const { number_passport, name, famil, birthday, surname, address, gender } =
      req.body;

    const passport = await Passport.findByPk(id);
    if (!passport) {
      const error = new Error("Passport topilmadi");
      error.status = 404;
      throw error;
    }

    await passport.update({
      number_passport,
      name,
      famil,
      birthday,
      surname,
      address,
      gender,
    });

    logger.info(`Passport yangilandi: ${passport.id}`);
    res.status(200).json({ message: "Passport yangilandi", passport });
  } catch (error) {
    logger.error(`Error updating passport: ${error.message}`);
    errorHandler(error, req, res);
  }
};

const deletePassport = async (req, res) => {
  try {
    const { id } = req.params;

    const passport = await Passport.findByPk(id);
    if (!passport) {
      const error = new Error("Passport topilmadi");
      error.status = 404;
      throw error;
    }

    await passport.destroy();
    logger.info(`Passport o'chirildi: ${passport.id}`);
    res.status(200).json({ message: "Passport o'chirildi" });
  } catch (error) {
    logger.error(`Error deleting passport: ${error.message}`);
    errorHandler(error, req, res);
  }
};

module.exports = {
  createPassport,
  getAllPassports,
  getPassportById,
  updatePassport,
  deletePassport,
};
