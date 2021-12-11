const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');
const User = require('./User.js');

const Conversation = sequelize.define('Conversation', {
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



User.hasMany(Conversation, {foreignKey: 'donorId'})
// Conversation.belongsTo(User)

User.hasMany(Conversation, {foreignKey: 'claimantId'})
// Conversation.belongsTo(User)



module.exports = Conversation;