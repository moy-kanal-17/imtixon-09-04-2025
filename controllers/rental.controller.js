const Rental = require("../models/rental");
const Seller = require("../models/seller");
const Payment = require("../models/payment");
const Canceled = require("../models/cansel");
const Contract = require("../models/contracts");
const Customer = require("../models/customer");
const passport = require("../models/passport");
const logger = require("../middleware/logger");
const errorHandler = require("../middleware/errorHandler");
const { Op } = require("sequelize");

const createRental = async (req, res) => {
  try {
    const {
      title_rent,
      price,
      categories,
      discriptions,
      seller_id,
      status,
      rental_date,
      return_date,
      total_price,
    } = req.body;

    const seller = await Seller.findByPk(seller_id);
    if (!seller) {
      return res.status(404).json({ message: "Seller topilmadi" });
    }
    const newRental = await Rental.create({
      title_rent,
      price,
      categories,
      discriptions,
      rental_date,
      return_date,
      total_price,
      status,
      seller_id,
    });

    logger.info(`Ijara yaratildi: ${newRental.id}`);
    res.status(201).json(newRental);
  } catch (error) {
    logger.error(`Error creating rental: ${error.message}`);
    errorHandler(error, req, res);
  }
};

const getAllRentals = async (req, res) => {
  try {
    const rentals = await Rental.findAll();
    logger.info(`Ijara ro'yxati: ${rentals.length} ta ijaralar`);
    res.status(200).json(rentals);
  } catch (error) {
    logger.error(`Error fetching rentals: ${error.message}`);
    errorHandler(error, req, res);
  }
};

const getRentalById = async (req, res) => {
  try {
    const rental = await Rental.findByPk(req.params.id);
    if (!rental) {
      const error = new Error("Ijara topilmadi");
      error.status = 404;
      throw error;
    }
    logger.info(`Ijara topildi: ${rental.id}`);
    res.status(200).json(rental);
  } catch (error) {
    logger.error(`Error fetching rental by ID: ${error.message}`);
    errorHandler(error, req, res);
  }
};

const updateRental = async (req, res) => {
  try {
    const {
      title_rent,
      price,
      categories,
      discriptions,
      seller_id,
      status,
      rental_date,
      return_date,
      total_price,
    } = req.body;
    console.log(req.params.id);
    // console.log(req.body);
    let rental = await Rental.findByPk(req.params.id);
    if (!rental) {
      const error = new Error("Ijara topilmadi");
      error.status = 404;
      throw error;
    }

    rental.title_rent = title_rent;
    rental.price = price;
    rental.categories = categories;
    rental.discriptions = discriptions;
    rental.status = status;
    rental.rental_date = rental_date;
    rental.return_date = return_date;
    rental.total_price = total_price;
    rental.seller_id = seller_id;
    console.log(rental);

    await rental.save();
    logger.info(`Ijara yangilandi: ${rental.id}`);
    res.status(200).json(rental);
  } catch (error) {
    logger.error(`Error updating rental: ${error.message}`);
    errorHandler(error, req, res);
  }
};

const deleteRental = async (req, res) => {
  try {
    const rental = await Rental.findByPk(req.params.id);
    if (!rental) {
      const error = new Error("Ijara topilmadi");
      error.status = 404;
      throw error;
    }

    await rental.destroy();
    logger.info(`Ijara o'chirildi: ${rental.id}`);
    res.status(200).json({ message: "Ijara o'chirildi" });
  } catch (error) {
    logger.error(`Error deleting rental: ${error.message}`);
    errorHandler(error, req, res);
  }
};

//cansel rental
const cancelRental = async (req, res) => {
  try {
    const rental = await Rental.findByPk(req.params.id);
    if (!rental) {
      const error = new Error("Ijara topilmadi");
      error.status = 404;
      throw error;
    }

    const canceledRental = await Canceled.create({
      rent_id: rental.id,
      seller_id: req.body.seller_id,
      customer_id: req.body.customer_id,
    });
    logger.info(`Ijara bekor qilindi: ${rental.id}`);
    res.status(200).json(canceledRental);
  } catch (error) {
    logger.error(`Error canceling rental: ${error.message}`);
    errorHandler(error, req, res);
  }
};

//---------------------------------------------------FILTERS----------------------------------------------------//

const getdate = async (req, res) => {
  const start_date = req.body.start_date;
  const end_date = req.body.end_date;

  try {
    const rentals = await Rental.findAll({
      where: {
        createdAt: {
          [Op.between]: [start_date, end_date],
        },
      },
    });

    return res.json(rentals);
  } catch (error) {
    logger.error(`Error fetching rentals by date: ${error.message}`);
    errorHandler(error, req, res);
  }
};

//----------2---------------------//
const getTop = async (req, res) => {
  try {
    const { category } = req.body;

    const rentals = await Rental.findAll({
      where: {
        categories: category,
      },
    });
    console.log(rentals.seller_id)

    const ownerCounts = rentals.reduce((acc, rental) => {
      const ownerId = rental.seller_id;
      if (acc[ownerId]) {
        acc[ownerId] += 1;
      } else {
        acc[ownerId] = 1;
      }
      return acc;
    }, {});

    const topOwners = Object.keys(ownerCounts)
      .map((ownerId) => ({ ownerId, count: ownerCounts[ownerId] }))
      .sort((a, b) => b.count - a.count);

    return res.status(200).json({
      message: `Berilgan kategoriyadagi eng ko'p ijaraga bergan Ownerlar`,
      topOwners,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};


//-----------------------------//3---------------------//
const getol = async (req, res) => {
  try {
    const { category } = req.body;
    const {id} = req.body

    const rentals = await Rental.findAll({
      where: {
        categories: category,
        seller_id: id
      },
    });
    console.log(rentals.seller_id);

    const ownerCounts = rentals.reduce((acc, rental) => {
      const ownerId = rental.seller_id;
      if (acc[ownerId]) {
        acc[ownerId] += 1;
      } else {
        acc[ownerId] = 1;
      }
      return acc;
    }, {});

    const topOwners = Object.keys(ownerCounts)
      .map((ownerId) => ({ ownerId, count: ownerCounts[ownerId] }))
      .sort((a, b) => b.count - a.count);

    return res.status(200).json({
      message: `Berilgan kategoriyadagi eng ko'p ijaraga bergan Ownerlar`,
      topOwners,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

//------------------------------------------------------------------------//
module.exports = {
  createRental,
  getAllRentals,
  getRentalById,
  updateRental,
  deleteRental,
  cancelRental,
  getdate,
  getTop,


};
