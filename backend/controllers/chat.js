const User = require('../db/models/User');
const Conversation = require('../db/models/Conversation');
const Message = require('../db/models/Message');
const { Op } = require('sequelize');


const startChat = (req, res) => {
  const { senderId, receiverId, id } = req.body;
  //query for conversation based on IDs
  console.log(senderId, receiverId)
  const smallerId = senderId > receiverId ? receiverId : senderId
  const largerId = senderId > receiverId ? senderId: receiverId

  let conversationID;

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
      conversationID = conversation.dataValues.id
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
        console.log(messages)
        const data = messages.map((message) => {
          return message
        })
        res.send({ conversationId: conversationID, data })
      })
    } else {
      Conversation.create({
        smallerId,
        largerId,
        itemId: id
      }).then((result) => {
        return res.json({ conversationId: result.dataValues.id, data: [] });
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

const getAllMessages = (req, res) => {
  Conversation.findAll({
    where: {
      [Op.or]: [
        { smallerId: req.params.id },
        { largerId: req.params.id }
      ]
    },
    include: [{
      model: User,
      as: 'Smaller',
      where: {
        id: {
          [Op.ne]: req.params.id
        }
      },
      required: false
    }, {
      model: User,
      as: 'Larger',
      where: {
        id: {
          [Op.ne]: req.params.id
        }
      },
      required: false
    }]
  })
  .then((result) => {
    for (var conversation of result) {
      conversation.dataValues.user = conversation.Smaller || conversation.Larger;
      delete conversation.dataValues.Larger;
      delete conversation.dataValues.Smaller;
    }
    res.json(result)
  })
  .catch((err) => {
    res.sendStatus(401)
  })
}

module.exports = {
  startChat,
  createMessage,
  getAllMessages
}