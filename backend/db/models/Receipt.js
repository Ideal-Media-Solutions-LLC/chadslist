const sequelize = require('../db.js');

const Receipt = sequelize.define('Receipt', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    claimId: DataTypes.INTEGER,
    condition: DataTypes.STRING,
    value: DataTypes.INTEGER
  },
  {
    indexes: [
      {
        name: 'receiptClaimIndex',
        using: 'HASH',
        fields: ['claimId']
      }
    ]
  }
);



module.exports = Receipt;