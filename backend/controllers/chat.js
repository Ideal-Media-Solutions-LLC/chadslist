const User = require('../db/models/User');
const Conversation = require('../db/models/Conversation');
const Message = require('../db/models/Message');

const startChat = (req, res) => {
  console.log(req.body)
}

module.exports = {
  startChat
}