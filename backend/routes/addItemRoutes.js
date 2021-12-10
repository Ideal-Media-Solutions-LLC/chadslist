const express = require('express');
const { additem } = require('../controllers/addItem.js');
const router = express.Router();

router.post('/additem', additem);

module.exports = router;