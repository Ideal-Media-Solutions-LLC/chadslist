const express = require('express');
const router = express.Router();
const { getDonateHis, getClaimHis } = require('../controllers/history.js');

router.get('/history/donations', getDonateHis);
router.get('/history/claims', getClaimHis);

module.exports = router;