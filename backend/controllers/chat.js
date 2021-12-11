const User = require('../db/models/User');
const Conversation = require('../db/models/Conversation');
const Message = require('../db/models/Message');
const { Op } = require('sequelize');


const startChat = (req, res) => {
  const { donorId, claimantId } = req.body;
  console.log(donorId, claimantId)
  //query for conversation based on IDs

  Conversation.findOne({
    where: {
      donorId: {
        [Op.or]: [donorId, claimantId]
      },
      claimantId: {
        [Op.or]: [donorId, claimantId]
       }
    }
  })
  .then((conversation) => {
    if (conversation) {
      console.log(conversation.dataValues.id)
      Message.findAll({
        where: {
          conversationId: conversation.dataValues.id
        }
      })
      .then((messages) => {
        console.log(messages)
      })
    } else {
      Conversation.create({
        donorId,
        claimantId
      })
    }
  })
}

const createMessage = (req, res) => {
  const { message, donorId, claimantId } = req.body
  Conversation.findOne({
    where: {
      donorId: {
        [Op.or]: [donorId, claimantId]
      },
      claimantId: {
        [Op.or]: [donorId, claimantId]
       }
    }
  })
  .then((conversation) => {
    if(conversation) {
      Message.create({
        message,
        userId: claimantId
      })
    } else {
      res.sendStatus(403);
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