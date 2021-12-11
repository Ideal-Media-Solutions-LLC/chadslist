const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');

const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    photoUrl: DataTypes.STRING,
    status: DataTypes.STRING,
    // Maybe have a user location (Like they most recently signed in from)
    longitude: DataTypes.FLOAT,
    latitude: DataTypes.FLOAT,
    password: DataTypes.STRING,
  }
);


// User.hasMany(Conversation);
// Conversation.belongsTo(User, { as: 'user1' });
// Conversation.belongsTo(User, { as: 'user2' });
// Message.belongsTo(Conversation);
// Conversation.hasMany(Message);

// User.sync({force: true});

module.exports = User;