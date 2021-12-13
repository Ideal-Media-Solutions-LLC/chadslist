const express = require('express');
const router = express.Router();
const { getDonateHis, getClaimHis, getReceiptHis, postReceiptHis } = require('../controllers/history.js');

// router.get('/history/donations', getDonateHis);

router.get('/donations', getDonateHis);

router.get('/claims', getClaimHis);
// router.get('/claims', getClaimHis);
router.get('/receipts', getReceiptHis)
router.post('/receipts', postReceiptHis);

module.exports = router;