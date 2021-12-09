const express = require('express');
const { register } = require('../controllers/register.js');
const router = express.Router();

router.post('/register', register);

module.exports = router;