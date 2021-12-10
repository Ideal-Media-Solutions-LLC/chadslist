const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('chadslist', 'yina', '', {
  host: 'localhost',
  dialect: 'postgres'
})


module.exports = sequelize;
