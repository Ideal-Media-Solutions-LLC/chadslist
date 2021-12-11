const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');
const User = require('./User.js');
const Conversation = require('./Conversation.js');

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  message: DataTypes.TEXT,
  userId: DataTypes.INTEGER
},
{
  indexes: [
    {
      name: 'userIdIndex',
      using: 'HASH',
      fields: ['userId']
    },
  ]
}
);

// Setting up associations (Relationships)
// Each message is from one user
// User.hasMany(Message, {foreignKey: 'from'});
// Message.belongsTo(User);

// Each message is to one user
User.hasMany(Message, { foreignKey: 'userId' });
Message.belongsTo(User);

Conversation.hasMany(Message)
Message.belongsTo(Conversation)


module.exports = Message;