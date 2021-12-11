const express = require('express');
const router = express.Router();
const { getDonateHis } = require('../controllers/history.js');

// router.get('/history/donations', getDonateHis);

router.get('/history/donations', getDonateHis);

router.get('/history/claims', (req, res) => {
  res.send('Hello wow claim History!');
});
// router.get('/claims', getClaimHis);

module.exports = router;