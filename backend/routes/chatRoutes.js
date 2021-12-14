const express = require('express');
const router = express.Router();
const { startChat, createMessage, getAllMessages } = require('../controllers/chat');

router.post('/', startChat)
router.post('/message', createMessage)
router.get('/message/:id', getAllMessages)

module.exports = router