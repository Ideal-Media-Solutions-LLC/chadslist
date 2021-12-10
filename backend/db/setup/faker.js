const sequelize = require('../db.js');
const faker = require('faker');
const bcrypt = require('bcrypt');
const User = require('../models/User.js');
const Item = require('../models/Item.js');
const Message = require('../models/Message.js');
const Receipt = require('../models/Receipt.js');
const Claim = require('../models/Claim.js');


const seedUser = async () => {
  try {
    let users = [];
    for (let i = 0; i < 100; i++) {
      users[i] = {};
      users[i].id = i;
      users[i].userName = faker.internet.userName();
      users[i].email = faker.internet.email();
      users[i].photoUrl = faker.image.people();
      if (i % 10 === 0) {
        users[i].status = 'charity';
      } else {
        users[i].status = 'individual';
      }
      if (i % 3 === 0) {
        users[i].latitude = 40.72557420158411;
        users[i].longitude = -74.01148541130824;
      } else if (i % 3 === 1) {
        users[i].latitude = 37.962882809573145;
        users[i].longitude = -122.57822275079111;
      } else {
        users[i].latitude = 47.77658566128346;
        users[i].longitude = -122.41963026610908;
      }
      users[i].password = await bcrypt.hash('123', 8);
    }
    await User.bulkCreate(users);
  } catch (error) {
    console.log(error);
  }
}
seedUser();
// New York: 40.72557420158411, -74.01148541130824
// San Francisco: 37.962882809573145, -122.57822275079111
// Seattle: 47.77658566128346, -122.41963026610908

const seedItem = () => {

}

const seedMessage = () => {

}

const seedReceipt = () => {

}

const seedClaim = () => {

}