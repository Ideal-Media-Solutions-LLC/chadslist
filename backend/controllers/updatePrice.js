const { Op } = require('sequelize');
const Receipt = require('../db/models/Receipt.js');

const updatePrice = async (req, res) => {
  console.log(req.body.price, req.body.itemId)
  let price = req.body.price;
  let itemId = req.body.itemId;
  // need to query database and update the value per Item ID
  const findItem = await Receipt.update({value: price}, {
    where: {
      itemId: itemId
    }
  })
  .then(data => res.status(200).json(data))
  .catch(err => {
    console.log('update item price ', err);
    res.status(500).json(err);
  })
}

module.exports = updatePrice;