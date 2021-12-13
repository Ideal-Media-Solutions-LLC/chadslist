const express = require('express');
const { getItemsInRadius } = require('../controllers/item.js');
const router = express.Router();

router.get('/', getItemsInRadius);

module.exports = router;