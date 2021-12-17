const { Op } = require('sequelize');
const Claim = require('../db/models/Claim.js');
const Item = require('../db/models/Item.js');
const claim = async (req, res) => {
  const claimerId = req.body.claimantId;
  console.log(claimerId);
  const itemId = req.body.itemId;
  const status = 'claimed';
  await Claim.create({ claimerId, itemId, status })
    .then(async () => {
      await Item.update({ claimed: true, status: 'claimed' }, {
        where: {
          id: itemId
        }
      });
      res.status(201).end();
    })
    .catch(err => console.log(err));
  res.status(500).end();
};

const unclaim = async (req, res) => {
  const { claimantId, itemId } = req.query;
  await Claim.destroy({
    where: {
      [Op.and]: [{claimerId: claimantId}, { status: 'claimed' }]
    }
  })
    .then(async () => {
      await Item.update({ claimed: false }, {
        where: {
          id: itemId
        }
      });
      res.status(200).end();
    })
    .catch(err => console.log(err));
};

module.exports = {
  claim,
  unclaim
};