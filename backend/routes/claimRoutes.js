const express = require('express');
const { claim, unclaim } = require('../controllers/claim.js');
const router = express.Router();

router.post('/', claim);
router.delete('/', unclaim)

module.exports = router;