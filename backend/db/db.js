const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('chadslist', 'mievro', '', {
  host: 'localhost',
  dialect: 'postgres'
})


const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userName: DataTypes.STRING,
  email: DataTypes.STRING,
  photoUrl: DataTypes.STRING,
  // Maybe have a user location (Like they most recently signed in from)
  location: DataTypes.INTEGER
});

const Item = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  imageUrl: DataTypes.STRING,
  // Have the item location be based off the users current signed in location but they can change it if they want to
  location: DataTypes.INTEGER,
  claimed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  // We might also do a separate category table and then have this be a foreign key
  category: Datatypes.STRING
})

const Claim = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: DataTypes.INTEGER,
  itemId: DataTypes.INTEGER,
  // I don't think we need to do a date or anything because sequelize will automatically put a created_at date
})

const Receipt = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: DataTypes.INTEGER,
  // We have a couple routes we can go here. Either have the Claim id, the item id, or both. For now I'm just going to do claim id
  claimId: DataTypes.INTEGER
})

const Message = sequelize.define('User', {
  // We have a couple different routes we can go with this as well. For now I'm just going to go with having each message be sepparate instead of having a chat log. That way we can have a date associated with each message
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // I'm not sure if we want to differentiate between claimant and donor... probably it would be a good idea so I will. I can imagine functionality that it would help with.
  donorId: DataTypes.INTEGER,
  claimantId: DataTypes.INTEGER,
  time: DataTypes.DATE,
  message: DataTypes.STRING
})



const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();