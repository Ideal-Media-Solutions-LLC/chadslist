const Item = require('../db/models/Item.js');
const additem = async (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;
  const location = req.body.location;
  const category = req.body.category;
  const donorId = req.body.donorId;
  const UserId = donorId;
  const item = await Item.create({ name, description, imageUrl, location, category, donorId })
    .catch(err => console.log('err at addItem', err));
  res.status(201).end();
};

module.exports = {
  additem,
};