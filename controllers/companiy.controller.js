const Companiy = require("../models/companiy");
const logger = require("../middleware/logger");
const errorHandler = require("../middleware/errorHandler");

const createCompaniy = async (req, res) => {
  try {
    console.log(req.body,"😐");
    
    const { name, companiy_email, address } = req.body;

    if (!name || !companiy_email || !address) {
      logger.info("HAMA MALUMOT KERAK!")
      return res
        .status(400)
        .json({ message: "Majburiy maydonlar to'liq emas" });
    }

    const newCompaniy = await Companiy.create({
      name,
      companiy_email,
      address,
    });
    logger.info(`Companiy yaratildi: ${newCompaniy.id}`);
    res.status(201).json(newCompaniy);
  } catch (error) {
    logger.error(`Companiy yaratishda xatolik: ${error.message}`);
    errorHandler(error, req, res);
  }
};

const getAllCompaniys = async (req, res) => {
  try {
    const all = await Companiy.findAll();
    res.status(200).json(all);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const getCompaniyById = async (req, res) => {
  try {
    const companiy = await Companiy.findByPk(req.params.id);
    if (!companiy) {
      return res.status(404).json({ message: "Companiy topilmadi" });
    }
    res.status(200).json(companiy);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const updateCompaniy = async (req, res) => {
  try {
    const { name, companiy_email, address } = req.body;
    const companiy = await Companiy.findByPk(req.params.id);

    if (!companiy) {
      return res.status(404).json({ message: "Companiy topilmadi" });
    }

    companiy.name = name || companiy.name;
    companiy.companiy_email = companiy_email || companiy.companiy_email;
    companiy.address = address || companiy.address;

    await companiy.save();
    res.status(200).json(companiy);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const deleteCompaniy = async (req, res) => {
  try {
    const companiy = await Companiy.findByPk(req.params.id);
    if (!companiy) {
      return res.status(404).json({ message: "Companiy topilmadi" });
    }

    await companiy.destroy();
    res.status(200).json({ message: "Companiy o‘chirildi" });
  } catch (error) {
    errorHandler(error, req, res);
  }
};

module.exports = {
  createCompaniy,
  getAllCompaniys,
  getCompaniyById,
  updateCompaniy,
  deleteCompaniy,
};
