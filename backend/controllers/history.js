const Claim = require('../db/models/Claim.js');
const Item = require('../db/models/Item.js');
const User = require('../db/models/User.js');

const getDonateHis = async (req, res) => {
  const donorId = req.body.userId;
  // console.log('donorId', donorId);
  await Item.findAll({
    where: {
      donorId
    }
  })
  .then(data => {
    res.status(200).json(data)
  })
  .catch(err => {
    console.log('error getting user donations history:', err);
    res.status(500).json(err);
  })
}

const getClaimHis = async (req, res) => {
  const claimerId = req.body.userId;
  await Claim.findAll({
    where: {
      claimerId
    }
  })
  .then(claims => {
    if (claims) {
      let items = claims.map(claim => claim.dataValues.itemId);

      // console.log('items:', items);
      Item.findAll({
        where: {
          id: items
        }
      }, {
        order: [
          ['updatedAt', 'DESC']
        ]
      })
      .then(items => {
        res.status(200).json(items)
      })
    } else {
      res.status(200).json([]);
    }
  })
  .catch(err => {
    console.log('error getting user claims history:', err);
    res.status(500).json(err);
  })
}

module.exports = {
  getDonateHis,
  getClaimHis
};