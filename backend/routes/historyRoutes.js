const express = require('express');
const router = express.Router();
const { getDonateHis, getClaimHis, getReceiptHis, postReceiptHis, delist, unclaim } = require('../controllers/history.js');

// router.get('/history/donations', getDonateHis);

router.get('/donations', getDonateHis);

router.get('/claims', getClaimHis);
// router.get('/claims', getClaimHis);
router.get('/receipts', getReceiptHis)
router.post('/receipts', postReceiptHis);

router.delete('/donations', delist);
router.put('/claims', unclaim);

module.exports = router;