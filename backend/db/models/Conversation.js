const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');
const User = require('./User.js');
const Message = require('./Message.js');
const Item = require('./Item.js');

const Conversation = sequelize.define('conversation', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true
  },
  smallerId: {
    type: DataTypes.INTEGER
  },
  largerId: {
    type: DataTypes.INTEGER
  },
  itemId: {
    type: DataTypes.INTEGER
  }
  },
  {
  indexes: [
    {
      name: 'smallerIdIndex',
      using: 'HASH',
      fields: ['smallerId']
    },
    {
      name: 'largerIdIndex',
      using: 'HASH',
      fields: ['largerId']
    }
  ]
  }
);


Conversation.hasMany(Message)
Message.belongsTo(Conversation)

User.hasMany(Conversation, {foreignKey: 'smallerId'})
User.hasMany(Conversation, {foreignKey: 'largerId'})

Conversation.belongsTo(User)

Item.hasMany(Conversation)


Item.hasMany(Conversation)

module.exports = Conversation;