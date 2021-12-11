const Claim = require('../db/models/Claim.js');
const Item = require('../db/models/Item.js');
const claim = async (req, res) => {
  const claimerId = req.body.claimantId;
  const itemId = req.body.itemId;
  const status = 'Ongoing';
  const UserId = req.body.UserId;
  const claim = await Claim.create({ claimerId, itemId, status, UserId })
    .then(async () => {
      const item = await Item.update({ claimed: true }, {
        where: {
          id: itemId
        }
      });
      res.status(201).end();
    })
    .catch(err => console.log(err));
  res.status(500).end()
};

module.exports = {
  claim,
};