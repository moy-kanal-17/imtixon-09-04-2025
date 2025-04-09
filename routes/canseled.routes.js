const express = require('express');
const canceledController = require('../controllers/cansel.controller');
const { getcancels, getallcancels } = require('../controllers/cansel.controller');

const router = express.Router();


router.get('/',getcancels);
router.get("/all", getallcancels);


module.exports = router;