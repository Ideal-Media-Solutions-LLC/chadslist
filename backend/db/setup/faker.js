const sequelize = require('../db.js');
const faker = require('faker');
const bcrypt = require('bcrypt');
const User = require('../models/User.js');
const Item = require('../models/Item.js');
const Conversation = require('../models/Conversation.js');
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

// New York: 40.72557420158411, -74.01148541130824
// San Francisco: 37.962882809573145, -122.57822275079111
// Seattle: 47.77658566128346, -122.41963026610908

const seedItem = () => {

}

// <40 newYork
// 40 -> 69 sf
// >69 seattle

const seedConversation = async () => {
  try {
    let conversations = [];
    for (let i = 0; i < 30; i++) {
      ny = {};
      ny.id = i;
      console.log('ny', ny.id)
      // User from 0 to 20
      ny.donorId = Math.floor(Math.random() * 20);
      // User from 21 to 39 (So we don't accidently get a use messaging themselves)
      ny.claimantId = Math.floor(Math.random() * (39 - 21 + 1) + 21);
      conversations.push(ny);
    }
    // await Conversation.bulkCreate(newYork);
    // let sf = [];
    for (let i = 0; i < 30; i++) {
      sf = {};
      sf.id = i + 30;
      console.log('sf', sf.id)
      // User from 0 to 20
      sf.donorId = Math.floor(Math.random() * (55 - 40 + 1) + 40);
      // User from 21 to 39 (So we don't accidently get a use messaging themselves)
      sf.claimantId = Math.floor(Math.random() * (60 - 56 + 1) + 56);
      conversations.push(sf);
    }
    // await Conversation.bulkCreate(sf);
    let seattle = [];
    for (let i = 0; i < 30; i++) {
      seattle = {};
      seattle.id = i + 60;
      console.log('seattle', seattle.id)
      // User from 0 to 20
      seattle.donorId = Math.floor(Math.random() * (85 - 70 + 1) + 70);
      // User from 21 to 39 (So we don't accidently get a use messaging themselves)
      seattle.claimantId = Math.floor(Math.random() * (99 - 86 + 1) + 86);
      conversations.push(seattle);
    }
    // await Conversation.bulkCreate(seattle);
    await Conversation.bulkCreate(conversations);
  } catch (error) {
    console.log(error);
  }
}

const seedMessage = async () => {
  // We have 0 - 89 conversations and we want to have messages in each of them so let's iterate from 0 - 89
  for (let i = 0; i < 90; i++) {
    // So we need to get the current conversation so that we can know who is part of the conversation
  }
}

const seedReceipt = () => {

}

const seedClaim = () => {

}


const seedAll = async() => {
  await User.sync({force: true});
  await Conversation.sync({force: true})
  await seedUser();
  await seedConversation();
}

seedAll();