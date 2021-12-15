const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');
const User = require('./')

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





module.exports = Receipt;