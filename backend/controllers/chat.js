const User = require('../db/models/User');
const Conversation = require('../db/models/Conversation');
const Message = require('../db/models/Message');
const { Op } = require('sequelize');


const startChat = (req, res) => {
  const { senderId, receiverId } = req.body;
  //query for conversation based on IDs
  console.log(senderId, receiverId)
  const smallerId = senderId > receiverId ? receiverId : senderId
  const largerId = senderId > receiverId ? senderId: receiverId


  Conversation.findOne({
    where: {
      [Op.and]: [
        { smallerId: smallerId },
        { largerId: largerId }
      ]
    }
  })
  .then((conversation) => {
    if (conversation) {
      Message.findAll({
        where: {
          conversationId: conversation.dataValues.id
        }
      }, {
        order: [
          ['createdAt', 'DESC']
        ]
      })
      .then((messages) => {
        const data = messages.map((message) => {
          return message
        })
        res.json(data)
      })
    } else {
      Conversation.create({
        smallerId,
        largerId
      }).then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        res.sendStatus(401).json({ message: 'Error'})
      })
    }
  })
  .catch((err) => {
    res.sendStatus(401).json({ message: 'Error has occured'})
  })
}

const createMessage = (req, res) => {
  const { message, senderId, receiverId } = req.body;
  const smallerId = senderId > receiverId ? receiverId : senderId
  const largerId = senderId > receiverId ? senderId: receiverId

  Conversation.findOne({
    where: {
      [Op.and]: [
        { smallerId: smallerId },
        { largerId: largerId }
      ]
    }
  })
  .then((conversation) => {
    if(conversation) {
      Message.create({
        message,
        userId: senderId,
        conversationId: conversation.dataValues.id
      }).then((data) => {
        res.json(data);
      })
    } else {
      res.sendStatus(403).json({ message: 'Conversation does not exist'});
    }
  })
  .catch((err) => {
    console.log(err)
  })
}

module.exports = {
  startChat,
  createMessage
}