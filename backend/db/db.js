const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('chadslist', 'postgres', '880824', {
  host: 'localhost',
  dialect: 'postgres'
})


module.exports = sequelize;
