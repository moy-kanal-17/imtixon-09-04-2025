const { where } = require("sequelize");
const Payment = require("../models/payment");
const { message } = require("../validations/admin.validation");

const createPayment = async (req, res) => {
  try {
    const { userId, amount, paymentMethod, transactionId,ownerID } = req.body;
    const payment = await Payment.create({
      userId,
      ownerID,
      amount,
      paymentMethod,
      transactionId,
    });
    res.status(201).json({ message: "Payment created successfully", payment });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating payment", error: error.message });
  }
};

const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll();
    res.status(200).json(payments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching payments", error: error.message });
  }
};


const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByPk(id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json(payment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching payment", error: error.message });
  }
};

// Update a payment by ID
const Pay = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, amount, paymentMethod, status, transactionId,ownerID } = req.body;
    const payment = await Payment.findByPk(id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    await payment.update({
      userId,
      ownerId:ownerID,
      amount,
      paymentMethod,
      status,
      transactionId,
    });
    res.status(200).json({ message: "Payment updated successfully", payment });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating payment", error: error.message });
  }
};

// Delete a payment by ID
const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByPk(id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    await payment.destroy();
    res.status(200).json({ message: "Payment deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting payment", error: error.message });
  }
};

const filters = async (req,res)=>{
  try {


    const {userId,ownerID} = req.body
    const result = await Payment.findAll({
      where: {
        userId: userId,
        ownerId: ownerID,
        status: "completed",
      },
    });
   return res.status(202).json({message:"result chiqdi!",result})
  } catch (error) {
    console.log(error);
    
    
  }
}

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  Pay,
  deletePayment,
  filters
};
