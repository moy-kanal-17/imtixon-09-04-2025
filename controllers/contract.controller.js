const  Contract  = require('../models/contract');
const { Op } = require('sequelize');

const createContract = async (req, res) => {
    try {
        const { rent_id, seller_id, customer_id, status, description, rent_finishing_at } = req.body;
        
        const newContract = await Contract.create({
            rent_id,
            seller_id,
            customer_id,
            status,
            description,
            rent_finishing_at,
        });
        
        return res.status(201).json({
            message: 'Contract successfully created',
            contract: newContract,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

const getAllContracts = async (req, res) => {
    try {
        const contracts = await Contract.findAll();
        return res.status(200).json({
            message: 'All contracts fetched successfully',
            contracts,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};


const getContractById = async (req, res) => {
    try {
        const contractId = req.params.id;
        const contract = await Contract.findByPk(contractId);
        
        if (!contract) {
            return res.status(404).json({ message: 'Contract not found' });
        }

        return res.status(200).json({
            message: 'Contract fetched successfully',
            contract,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

const updateContract = async (req, res) => {
    try {
        const contractId = req.params.id;
        const { status, description, rent_finishing_at } = req.body;

        const contract = await Contract.findByPk(contractId);
        
        if (!contract) {
            return res.status(404).json({ message: 'Contract not found' });
        }

        contract.status = status || contract.status;
        contract.description = description || contract.description;
        contract.rent_finishing_at = rent_finishing_at || contract.rent_finishing_at;

        await contract.save();

        return res.status(200).json({
            message: 'Contract updated successfully',
            contract,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

const deleteContract = async (req, res) => {
    try {
        const contractId = req.params.id;

        const contract = await Contract.findByPk(contractId);

        if (!contract) {
            return res.status(404).json({ message: 'Contract not found' });
        }

        await contract.destroy();

        return res.status(200).json({ message: 'Contract deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

const getContractsByStatus = async (req, res) => {
    try {
        const { status } = req.params;

        const contracts = await Contract.findAll({
            where: { status: { [Op.eq]: status } },
        });

        return res.status(200).json({
            message: `Contracts with ${status} status fetched successfully`,
            contracts,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};


const cancelContract = async (req, res) => {
  try {
    const contractId = req.params.id;

    const contract = await Contract.findByPk(contractId);

    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    contract.status = "cancel";

    await contract.save();

    return res.status(200).json({
      message: 'Contract status has been changed to "cancel"',
      contract,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};




module.exports = {
    createContract,
    getAllContracts,
    getContractById,
    updateContract,
    deleteContract,
    getContractsByStatus,
    cancelContract,
};