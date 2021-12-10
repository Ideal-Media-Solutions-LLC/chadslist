const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('chadslist', 'postgres', '123456', {
  host: 'localhost',
  dialect: 'postgres'
})


module.exports = sequelize;