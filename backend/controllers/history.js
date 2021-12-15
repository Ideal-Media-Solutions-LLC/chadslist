const Claim = require('../db/models/Claim.js');
const Item = require('../db/models/Item.js');
const User = require('../db/models/User.js');
const Receipt = require('../db/models/Receipt.js');

const getDonateHis = async (req, res) => {
  const donorId = req.query.userId;
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
  const claimerId = req.query.userId;
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
const getReceiptHis = async (req, res) => {
  const donorId = req.query.donorId;
  await Receipt.findAll({
    where: {
      donorId
    }
   })
   .then((data) => {
     res.status(200).send(data);
   })
   .catch((err) => {
     console.log(err);
     res.status(500).end();
   });
};
const postReceiptHis = async (req, res) => {
  const { claimId, donorId, condition, value } = req.body;
  await Receipt.create({ claimId, donorId, condition, value })
  .then(() => {
    res.status(201).end();
  })
  .catch((err) => {
    console.log(err);
    res.status(500).end();
  });
};

const delist = async (req, res) => {
  const itemId = req.query.itemId;
  await Item.destroy({
    where: {
      id: itemId
    }
  })
  .then(data => {
    res.status(204).json(`Succesfully deleted item ${itemId}`)
  })
  .catch(err => {
    res.status(500).json('Error delist the item', err)
  })
}

const unclaim = async (req, res) => {
  const itemId = req.query.itemId;

  await Claim.destroy({
    where: {
      itemId: itemId
    }
  })
  .then(data => {
    Item.update({
      status: 'unclaimed',
      claimed: 'f'
    }, {
      where: {
        id: itemId
      }
    })
  })
  .then(data => {
    res.json(data).sendStatus(200)
  })
  .catch(err => {
    res.json(err).sendStatus(500)
  })
}

module.exports = {
  getDonateHis,
  getClaimHis,
  getReceiptHis,
  postReceiptHis,
  unclaim,
  delist
};