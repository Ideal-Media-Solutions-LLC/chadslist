const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('chadslist', 'postgres', '123456', {
const sequelize = new Sequelize('chadslist', 'yina', '', {
  host: 'localhost',
  dialect: 'postgres'
})


module.exports = sequelize;
