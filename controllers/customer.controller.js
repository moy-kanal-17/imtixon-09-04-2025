const Customer = require("../models/customer");
const Rental = require("../models/rental");
const Seller = require("../models/seller");
const logger = require("../middleware/logger");
const errorHandler = require("../middleware/errorHandler");
const bcrypt = require("bcrypt");

const createCustomer = async (req, res) => {
  try {
    let { full_name, email, phone_number, address, password, passport_id } =
      req.body;

    if (
      !full_name ||
      !email ||
      !phone_number ||
      !address ||
      !password ||
      !passport_id
    ) {
      logger.warn("Ma'lumotlar to'liq emas: " + JSON.stringify(req.body));
      return res.status(400).json({ message: "Ma'lumotlar to'liq emas" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    password = hashedPassword;
    const newCustomer = await Customer.create({
      full_name,
      email,
      phone_number,
      address,
      password,
      passport_id,
    });

    logger.info(`Customer yaratildi: ${newCustomer.id}`);
    res.status(201).json(newCustomer);
  } catch (error) {
    logger.error(`Error creating customer: ${error.message}`);
    errorHandler(error, req, res);
  }
};

const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    logger.info(`All customers fetched: ${customers.length} ta customer`);
    res.status(200).json(customers);
  } catch (error) {
    logger.error(`Error fetching customers: ${error.message}`);
    errorHandler(error, req, res);
  }
};

const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByPk(id);
    if (!customer) {
      logger.warn(`Customer topilmadi: ID ${id}`);
      return res.status(404).json({ message: "Customer topilmadi" });
    }

    logger.info(`Customer topildi: ${customer.id}`);
    res.status(200).json(customer);
  } catch (error) {
    logger.error(`Error fetching customer by ID: ${error.message}`);
    errorHandler(error, req, res);
  }
};

const updateCustomer = async (req, res) => {
  try {
    const { full_name, email, phone_number, address } = req.body;
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      logger.warn(`Customer topilmadi: ID ${req.params.id}`);
      return res.status(404).json({ message: "Customer topilmadi" });
    }

    customer.full_name = full_name;
    customer.email = email;
    customer.phone_number = phone_number;
    customer.address = address;

    await customer.save();
    logger.info(`Customer yangilandi: ${customer.id}`);
    res.status(200).json(customer);
  } catch (error) {
    logger.error(`Error updating customer: ${error.message}`);
    errorHandler(error, req, res);
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      logger.warn(`Customer topilmadi: ID ${req.params.id}`);
      return res.status(404).json({ message: "Customer topilmadi" });
    }

    await customer.destroy();
    logger.info(`Customer o'chirildi: ${customer.id}`);
    res.status(200).json({ message: "Customer o'chirildi" });
  } catch (error) {
    logger.error(`Error deleting customer: ${error.message}`);
    errorHandler(error, req, res);
  }
};





module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
