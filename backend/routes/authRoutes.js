const express = require('express');
const { register, login, verify } = require('../controllers/auth.js');
const { verifyUser } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verify', verifyUser, verify);

module.exports = router;