const sequelize = require('./db.js');

const testConnection = async () => {
  try {
    await sequelize.sync({force: true});
    console.log('Syncing complete');
  } catch (error) {
    console.error('Unable to sync to the database:', error);
  }
}

testConnection();