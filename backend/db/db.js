const { Sequelize } = require('sequelize');
const { dbUsername, dbPassword } = require('./config/config.js');

const sequelize = new Sequelize('chadslist', dbUsername, dbPassword, {
  host: 'localhost',
  dialect: 'postgres'
});


module.exports = sequelize;
