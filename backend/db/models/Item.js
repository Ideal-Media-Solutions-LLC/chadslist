const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');
const User = require('./User.js');

const Item = sequelize.define('item', {
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
  longitude: DataTypes.FLOAT,
  latitude: DataTypes.FLOAT,
  status: DataTypes.STRING,
  claimed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  // We might also do a separate category table and then have this be a foreign key
  category: DataTypes.STRING,
  donorId: DataTypes.INTEGER
},
{
  indexes: [
    {
      name: 'itemDonorIndex',
      using: 'HASH',
      fields: ['donorId']
    }
  ]
}
);

// Setting up associations (Relationships)
// Each donor (User) can have many donations (Items)
User.hasMany(Item, {foreignKey: 'donorId'});
// Item.belongsTo(User);



module.exports = Item;