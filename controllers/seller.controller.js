const Seller = require("../models/seller");
const logger = require("../middleware/logger");
const errorHandler = require("../middleware/errorHandler");
const bcrypt = require("bcrypt");

const createSeller = async (req, res) => {
  try {
    let { full_name, email, password, company_id, start_work_at } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    password = hashedPassword;
    const newSeller = await Seller.create({
      full_name,
      email,
      password,
      company_id,
      start_work_at,
    });

    logger.info(`Seller yaratildi: ${newSeller.id}`);
    res.status(201).json(newSeller);
  } catch (error) {
    logger.error(`Error creating seller: ${error.message}`);
    errorHandler(error, req, res);
  }
};

const getAllSellers = async (req, res) => {
  try {
    const sellers = await Seller.findAll();
    logger.info(`Sellers ro'yxati: ${sellers.length} ta seller`);
    res.status(200).json(sellers);
  } catch (error) {
    logger.error(`Error fetching sellers: ${error.message}`);
    errorHandler(error, req, res);
  }
};

const getSellerById = async (req, res) => {
  try {
    const seller = await Seller.findByPk(req.params.id);
    if (!seller) {
      const error = new Error("Seller topilmadi");
      error.status = 404;
      throw error;
    }
    logger.info(`Seller topildi: ${seller.id}`);
    res.status(200).json(seller);
  } catch (error) {
    logger.error(`Error fetching seller by ID: ${error.message}`);
    errorHandler(error, req, res);
  }
};

const updateSeller = async (req, res) => {
  try {
    const { full_name, email, password, company_id, start_work_at } = req.body;
    const seller = await Seller.findByPk(req.params.id);
    if (!seller) {
      const error = new Error("Seller topilmadi");
      error.status = 404;
      throw error;
    }

    seller.full_name = full_name;
    seller.email = email;
    seller.password = password;
    seller.company_id = company_id;
    seller.start_work_at = start_work_at;

    await seller.save();
    logger.info(`Seller yangilandi: ${seller.id}`);
    res.status(200).json(seller);
  } catch (error) {
    logger.error(`Error updating seller: ${error.message}`);
    errorHandler(error, req, res);
  }
};

const deleteSeller = async (req, res) => {
  try {
    const seller = await Seller.findByPk(req.params.id);
    if (!seller) {
      const error = new Error("Seller topilmadi");
      error.status = 404;
      throw error;
    }

    logger.info(`Seller o'chirildi: ${seller.id}`);
    await seller.destroy();
    res.status(200).json({ message: "Seller o'chirildi" });
  } catch (error) {
    logger.error(`Error deleting seller: ${error.message}`);
    errorHandler(error, req, res);
  }
};

module.exports = {
  createSeller,
  getAllSellers,
  getSellerById,
  updateSeller,
  deleteSeller,
};
