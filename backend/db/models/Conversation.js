const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');
const User = require('./User.js');
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



User.hasMany(Conversation, {as: 'Smaller', foreignKey: 'smallerId'})
User.hasMany(Conversation, {as: 'Larger', foreignKey: 'largerId'})

Conversation.belongsTo(User, { targetKey: 'id', foreignKey: 'smallerId'})
Conversation.belongsTo(User, { targetKey: 'id', foreignKey: 'largerId'})

// const test = async () => {
//   let conversation = await Conversation.findByPk(2, {
//     include: ['Smaller', 'Larger']
//   })
//   debugger;
// }

// test();

module.exports = Conversation;