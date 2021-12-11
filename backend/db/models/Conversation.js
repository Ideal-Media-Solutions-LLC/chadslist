const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');
const User = require('./User.js');

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
        name: 'conversationDonorIdIndex',
        using: 'HASH',
        fields: ['donorId']
      },
      {
        name: 'conversationClaimantIdIndex',
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