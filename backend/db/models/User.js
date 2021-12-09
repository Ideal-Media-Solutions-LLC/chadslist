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
    password: DataTypes.STRING,
    // Maybe have a user location (Like they most recently signed in from)
    location: DataTypes.INTEGER,
    status: DataTypes.STRING,
    password: DataTypes.STRING,
  }
);



module.exports = User;