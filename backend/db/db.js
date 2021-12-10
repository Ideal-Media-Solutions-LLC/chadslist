const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('chadslist', 'superbored', '123456', {
  host: 'localhost',
  dialect: 'postgres'
})


module.exports = sequelize;
