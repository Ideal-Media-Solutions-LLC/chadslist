const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');
const User = require('./User.js');
const Message = require('./Message.js');

const Conversation = sequelize.define('conversation', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true
  },
  donorId: {
    type: DataTypes.INTEGER
  },
  claimantId: {
    type: DataTypes.INTEGER
  }
  },
  {
  indexes: [
    {
      name: 'donorIdIndex',
      using: 'HASH',
      fields: ['donorId']
    },
    {
      name: 'claimantIdIndex',
      using: 'HASH',
      fields: ['claimantId']
    }
  ]
  }
);


Conversation.hasMany(Message)
Message.belongsTo(Conversation)

User.hasMany(Conversation, {foreignKey: 'donorId'})
User.hasMany(Conversation, {foreignKey: 'claimantId'})

Conversation.belongsTo(User)


module.exports = Conversation;