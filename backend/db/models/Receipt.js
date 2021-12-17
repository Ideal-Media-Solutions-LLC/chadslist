const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');
const User = require('./User.js');
const Item = require('./Item.js');
const Claim = require('./Claim.js');

const Receipt = sequelize.define('receipt', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  itemId: DataTypes.INTEGER,
  claimId: DataTypes.INTEGER,
  donorId: DataTypes.INTEGER,
  condition: DataTypes.STRING,
  value: DataTypes.INTEGER
},
{
  indexes: [
    {
      name: 'receiptClaimIndex',
      using: 'HASH',
      fields: ['claimId']
    },
    {
      name: 'receiptDonorIndex',
      using: 'HASH',
      fields: ['donorId']
    },
    {
      name: 'receiptItemIndex',
      using: 'HASH',
      fields: ['itemId']
    }
  ]
}
);


User.hasMany(Receipt, {foreignKey: 'donorId'});
Receipt.belongsTo(User);

Item.hasOne(Receipt, {foreignKey: 'itemId'});
Receipt.belongsTo(Item);

Claim.hasOne(Receipt, {foreignKey: 'claimId'});
Receipt.belongsTo(Claim);


module.exports = Receipt;