const express = require('express');
const router = express.Router();
const { startChat, createMessage } = require('../controllers/chat');

router.post('/', startChat)
router.post('/message', createMessage)

module.exports = router