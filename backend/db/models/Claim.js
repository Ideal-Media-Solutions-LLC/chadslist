const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');
const User = require('./User.js');
const Item = require('./User.js');
const Receipt = require('./Receipt.js');

const Claim = sequelize.define('claim', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    claimerId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    // I don't think we need to do a date or anything because sequelize will automatically put a created_at date
  },
  {
    indexes: [
      {
        name: 'claimClaimerIndex',
        using: 'HASH',
        fields: ['claimerId']
      },
      {
        name: 'claimItemIndex',
        using: 'HASH',
        fields: ['itemId']
      },
    ]
  }
);

// Setting up associations (Relationships)
// Each claimer (User) can have many claims
User.hasMany(Claim, {foreignKey: 'claimerId'});
// Claim.belongsTo(User);

// Each Item can have many claims
Item.hasMany(Claim, {foreignKey: 'itemId'});
Claim.belongsTo(Item);

// Each claim can have one receipt (Foreign key is stored on the receipt)
Claim.hasOne(Receipt, {foreignKey: 'claimId'});
Receipt.belongsTo(Claim);



module.exports = Claim;