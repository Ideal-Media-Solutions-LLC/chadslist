const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');
const User = require('./User.js');
const Message = require('./Message.js');

const Conversation = sequelize.define('conversation', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true
  }
});


Conversation.hasMany(Message)
Message.belongsTo(Conversation)

User.hasMany(Conversation)
Conversation.belongsTo(User)


module.exports = Conversation;