const { Op } = require('sequelize');
const Claim = require('../db/models/Claim.js');
const Item = require('../db/models/Item.js');
const claim = async (req, res) => {
  const claimerId = req.body.claimantId;
  const itemId = req.body.itemId;
  const status = 'Ongoing';
  const UserId = req.body.UserId;
  const claim = await Claim.create({ claimerId, itemId, status, UserId })
    .then(async () => {
      const item = await Item.update({ claimed: false }, {
        where: {
          id: itemId
        }
      });
      res.status(201).end();
    })
    .catch(err => console.log(err));
  res.status(500).end()
};

const unclaim = async (req, res) => {
  const { claimantId, itemId } = req.query;
  item = await Claim.destroy({
    where: {
      [Op.and]: [{claimerId: claimantId}, { status: 'claimed' }]
    }
  })
    .then(async () => {
      await Item.update({ claimed: false }, {
        where: {
          id: itemId
        }
      })
      res.status(200).end();
    })
    .catch(err => console.log(err));
};

module.exports = {
  claim,
  unclaim
};