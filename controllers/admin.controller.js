const errorHandler = require("../middleware/errorHandler");
const logger = require("../middleware/logger");
const Admin  = require("../models/admin");
const bcrypt = require("bcrypt");

const createAdmin = async (req, res) => {
  try {
    let { password, full_name, email, role } = req.body;
    if (!password || !full_name || !email || !role) {
      logger.error("Ma'lumotlar to'liq emas: ");}

    const hashedPassword = await bcrypt.hash(password, 10);
    password = hashedPassword;
    const newAdmin = await Admin.create({
      password,
      full_name,
      email,
      role,
    });
    logger.info(`Admin yaratildi: ${newAdmin.id}`);
    res.status(201).json(newAdmin);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll();
    if (!admins) return errorHandler(error, req, res);
    logger.info(`Adminlar ro'yxati: ${admins.length} ta admin`);
    res.status(200).json(admins);
  } catch (error) {
    errorHandler(error, req, res);
  }
}

const getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.params.id);
    if (!admin) return errorHandler(error, req, res);
    logger.info(`Admin topildi: ${admin.id}`);
    res.status(200).json(admin);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const updateAdmin = async (req, res) => {
  try {
    let { password, full_name, email, role } = req.body;
    const admin = await Admin.findByPk(req.params.id);
    if (!admin) return errorHandler(error, req, res);
    password = await bcrypt.hash(password, 10);
    admin.password = password;
    admin.full_name = full_name;
    admin.email = email;
    admin.role = role;

    await admin.save();
    logger.info(`Admin yangilandi: ${admin.id}`);
    res.status(200).json(admin);
  } catch (error) {
    errorHandler(error, req, res);
  }
};


const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.params.id);
    if (!admin) return errorHandler(error, req, res);

    logger.info(`Admin o'chirildi: ${admin.id}`);
    await admin.destroy();
    res.status(200).json({ message: "Admin o'chirildi" });
  } catch (error) {
    errorHandler(error, req, res);
  }
};

module.exports = { createAdmin,getAllAdmins, getAdminById, updateAdmin, deleteAdmin };
