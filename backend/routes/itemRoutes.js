const express = require('express');
const { getItemsInRadius, createItem } = require('../controllers/item.js');
const router = express.Router();

router.get('/', getItemsInRadius);
router.post('/', createItem);

module.exports = router;