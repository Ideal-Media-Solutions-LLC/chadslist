const sequelize = require('./db.js');
const User = require('./models/User.js');
const Item = require('./models/Item.js');
const Message = require('./models/Message.js');
const Receipt = require('./models/Receipt.js');
const Claim = require('./models/Claim.js');

const testConnection = async () => {
  try {
    await sequelize.sync();
    console.log('Syncing complete');
    await User.sync();
    console.log('User Syncing complete');
    await Item.sync();
    console.log('Item Syncing complete');
    await Message.sync();
    console.log('Message Syncing complete');
    await Receipt.sync();
    console.log('Receipt Syncing complete');
    await Claim.sync();
    console.log('Claim Syncing complete');
  } catch (error) {
    console.error('Unable to sync to the database:', error);
  }
}

testConnection();