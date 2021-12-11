const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('chadslist', 'mievro', '', {
  host: 'localhost',
  dialect: 'postgres'
})


module.exports = sequelize;
