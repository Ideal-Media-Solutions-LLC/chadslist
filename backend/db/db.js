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
  location: DataTypes.INTEGER,
  // I'm not sure how we will want to track charity status? A boolean?
});

const Item = sequelize.define('Item', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  // Right now we just will be able to support a single picture. Make a sepparate image table to support multiple pictures?
  imageUrl: DataTypes.STRING,
  // Have the item location be based off the users current signed in location but they can change it if they want to
  location: DataTypes.INTEGER,
  claimed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  // We might also do a separate category table and then have this be a foreign key
  category: DataTypes.STRING,
  donorId: DataTypes.INTEGER
})

const Claim = sequelize.define('Claim', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  claimerId: DataTypes.INTEGER,
  itemId: DataTypes.INTEGER,
  status: DataTypes.STRING,
  // I don't think we need to do a date or anything because sequelize will automatically put a created_at date
})

const Receipt = sequelize.define('Receipt', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // We have a couple routes we can go here. Either have the Claim id, the item id, or both. For now I'm just going to do claim id
  claimId: DataTypes.INTEGER,
  condition: DataTypes.STRING,
  value: DataTypes.INTEGER
})

const Message = sequelize.define('Message', {
  // We have a couple different routes we can go with this as well. For now I'm just going to go with having each message be sepparate instead of having a chat log. That way we can have a date associated with each message
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // I'm not sure if we want to differentiate between claimant and donor... probably it would be a good idea so I will. I can imagine functionality that it would help with.
  from: DataTypes.INTEGER,
  to: DataTypes.INTEGER,
  // Probably don't actually need to have a time since sequelize automatically adds a created_at
  message: DataTypes.STRING
})


// Setting up associations (Relationships)
// Each donor (User) can have many donations (Items)
User.hasMany(Item, {foreignKey: 'donorId'});
Item.belongsTo(User);

// Each claimer (User) can have many claims
User.hasMany(Claim, {foreignKey: 'claimantId'});
Claim.belongsTo(User);

// Each Item can have many claims
Item.hasMany(Claim, {foreignKey: 'itemId'});
Claim.belongsTo(Item);

// Each claim can have one receipt (Foreign key is stored on the receipt)
Claim.hasOne(Receipt, {foreignKey: 'claimId'});
Receipt.belongsTo(Claim);

// Each message is from one user
User.hasMany(Message, {foreignKey: 'from'});
Message.belongsTo(User);

// Each message is to one user
User.hasMany(Message, {foreignKey: 'to'});
Message.belongsTo(User);



const testConnection = async () => {
  try {
    await sequelize.sync({force: true});
    console.log('Syncing complete');
  } catch (error) {
    console.error('Unable to sync to the database:', error);
  }
}

testConnection();