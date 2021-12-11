const express = require('express');
const router = express.Router();
const { startChat } = require('../controllers/chat');

router.use('/', startChat)

module.exports = router