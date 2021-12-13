const express = require('express');
const router = express.Router();
const { getDonateHis, getClaimHis, getReceiptHis, getReceiptHis } = require('../controllers/history.js');

// router.get('/history/donations', getDonateHis);

router.get('/donations', getDonateHis);

router.get('/claims', getClaimHis);
// router.get('/claims', getClaimHis);
router.get('/receipts')
router.post('/receipts', postDonateHis);

module.exports = router;