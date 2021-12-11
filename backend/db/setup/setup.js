const sequelize = require('../db.js');
const User = require('../models/User.js');
const Item = require('../models/Item.js');
const Message = require('../models/Message.js');
const Receipt = require('../models/Receipt.js');
const Claim = require('../models/Claim.js');
const Conversation = require('../models/Conversation.js');

module.exports.resetDB = async () => {
  try {
    await sequelize.drop({cascade: true});
    await sequelize.sync({ force: true });
    console.log('Syncing complete');
  } catch (error) {
    console.error('Unable to sync to the database:', error);
  }
}