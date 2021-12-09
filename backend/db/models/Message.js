const sequelize = require('../db.js');
const User = require('../User.js');

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  from: DataTypes.INTEGER,
  to: DataTypes.INTEGER,
  message: DataTypes.TEXT
},
{
  indexes: [
    {
      name: 'messageFromIndex',
      using: 'HASH',
      fields: ['from']
    },
    {
      name: 'messageToIndex',
      using: 'HASH',
      fields: ['to']
    }
  ]
}
);

// Setting up associations (Relationships)
// Each message is from one user
User.hasMany(Message, {foreignKey: 'from'});
Message.belongsTo(User);

// Each message is to one user
User.hasMany(Message, {foreignKey: 'to'});
Message.belongsTo(User);



module.exports = Message;