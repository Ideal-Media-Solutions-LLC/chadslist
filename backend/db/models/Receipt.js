const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');

const Receipt = sequelize.define('receipt', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
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
      }
    ]
  }
);



module.exports = Receipt;