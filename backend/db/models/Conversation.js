const { DataTypes, Op } = require('sequelize')
const sequelize = require('../db.js');
const User = require('./User.js');

const Conversation = sequelize.define('conversation', {

});

module.exports = Conversation;