const sequelize = require('../db.js');

module.exports.resetDB = async () => {
  try {
    await sequelize.drop({ cascade: true });
    await sequelize.sync({ force: true });
    console.log('Syncing complete');
  } catch (error) {
    console.error('Unable to sync to the database:', error);
  }
};