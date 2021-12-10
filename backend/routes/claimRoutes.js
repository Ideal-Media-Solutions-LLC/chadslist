const express = require('express');
const { claim } = require('../controllers/claim.js');
const router = express.Router();

router.post('/claim', claim);

module.exports = router;