const { DataTypes, Op } = require('sequelize')
const sequelize = require('../db.js');
const User = require('./User.js');

const Conversation = sequelize.define('conversation', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true
  }
});

Conversation.hasMany(Message, {foreignKey: })

module.exports = Conversation;