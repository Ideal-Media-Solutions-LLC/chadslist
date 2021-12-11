const Claim = require('../db/models/Claim.js');
const Item = require('../db/models/Item.js');
const User = require('../db/models/User.js');

const getDonateHis = async (req, res) => {
  const donorId = req.body.userId;
  console.log('donorId', donorId);
  await Item.findAll({
    where: {
      donorId
    }
  })
  .then(data => {
    res.status(200).json(data)
  })
  .catch(err => {
    console.log('error getting user donation history:', err)
  })
}

module.exports = {
  getDonateHis
  // getClaimHis
};