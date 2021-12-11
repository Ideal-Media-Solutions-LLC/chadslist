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

      if (i < 40) {
        // NY
        users[i].latitude = 40.72557420158411;
        users[i].longitude = -74.01148541130824;
      } else if (i >= 40 && i < 70) {
        // SF
        users[i].latitude = 37.962882809573145;
        users[i].longitude = -122.57822275079111;
      } else {
        // SA
        users[i].latitude = 47.77658566128346;
        users[i].longitude = -122.41963026610908;
      }
      users[i].password = await bcrypt.hash('123', 8);
    }
    await User.bulkCreate(users);
  } catch (error) {
    console.log('error adding data for users', error);
  }
}

// New York: 40.72557420158411, -74.01148541130824
// San Francisco: 37.962882809573145, -122.57822275079111
// Seattle: 47.77658566128346, -122.41963026610908

let categories = [
  'Apparel',
  'Electronics',
  'Entertainment',
  'Garden and Outdoor',
  'Hobbies',
  'Home Goods',
  'Musical Instruments',
  'Office Supplies',
  'Pet Supplies',
  'Sporting Goods'
];

let itemStatus = ['unclaimed', 'unclaimed', 'processing', 'claimed'];

let coordinates = {
  ny: {
    latitude: 40.72557420158411,
    longitude: -74.01148541130824
  },
  sf: {
    latitude: 37.962882809573145,
    longitude: -122.57822275079111
  },
  sa: {
    latitude: 47.77658566128346,
    longitude: -122.41963026610908
  }
};

let items = [];
const seedItem = async () => {
  // let items = [];
  try {
    for (var i = 0; i < 100; i++) {
      items[i] = {};
      items[i].id = i;
      items[i].name = faker.commerce.productName();
      items[i].description = faker.commerce.productDescription();
      items[i].imageUrl = faker.image.fashion();
      items[i].category = categories[Math.floor(Math.random() * 10)];
      items[i].status = itemStatus[Math.floor(Math.random() * 4)];

      if (i < 40) {
        // NY
        items[i].latitude = (coordinates.ny.latitude - 0.5 + Math.random()).toFixed(12);
        items[i].longitude = (coordinates.ny.longitude - 0.5 + Math.random()).toFixed(12);
        items[i].donorId = Math.floor(Math.random() * 40);
      } else if (i >= 40 & i < 70) {
        // SF
        items[i].latitude = (coordinates.sf.latitude - 0.5 + Math.random()).toFixed(12);
        items[i].longitude = (coordinates.sf.longitude - 0.5 + Math.random()).toFixed(12);
        items[i].donorId = 40 + Math.floor(Math.random() * 30);
      } else {
        // SA
        items[i].latitude = (coordinates.sa.latitude - 0.5 + Math.random()).toFixed(12);
        items[i].longitude = (coordinates.sa.longitude - 0.5 + Math.random()).toFixed(12);
        items[i].donorId = 70 + Math.floor(Math.random() * 30);
      }
    }
    await Item.bulkCreate(items);
  } catch (error) {
    console.log('error adding data for items', error);
  }
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
      sf.id = i + 31;
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
      seattle.id = i + 61;
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

const seedMessage = () => {

}

const seedReceipt = () => {

}

const seedClaim = () => {

}


const seedAll = async() => {
  await User.sync({force: true});
  await Conversation.sync({force: true})
  await Item.sync({force: true});
  await seedUser();
  await seedConversation();
  await seedItem();
}

seedAll();