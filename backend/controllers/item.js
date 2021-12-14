const { Op } = require('sequelize');
const Item = require('../db/models/Item.js');

const getItemsInRadius = async (req, res) => {
  try {
    let userId = parseInt(req.query.userId) || 0;
    let radiusInMiles = parseInt(req.query.radius) || 10;
    let radiusInDegrees = radiusInMiles / 69;
    // Location the search is centered around
    let searchLatitude = parseFloat(req.query.latitude);
    let searchLongitude = parseFloat(req.query.longitude);
    // The max and min latitudes and longitudes we want to receive
    let maxLat = searchLatitude + radiusInDegrees;
    let minLat = searchLatitude - radiusInDegrees;
    let maxLong = searchLongitude + radiusInDegrees;
    let minLong = searchLongitude - radiusInDegrees;
    let allCategory =['Apparel', 'Electronics', 'Entertainment','Garden and Outdoor', 'Hobbies', 'Home Goods','Musical Instruments', 'Office Supplies','Pet Supplies', 'Sporting Goods']

    let searchCategory = req.query.category || allCategory;
    let items = await Item.findAll({
      where: {
        longitude: {
          [Op.lt]: maxLong,
          [Op.gt]: minLong,
        },
        latitude: {
          [Op.lt]: maxLat,
          [Op.gt]: minLat,
        },
        donorId: {
          [Op.ne]: userId
        },
        category: searchCategory,
        status: 'unclaimed'
      }
    });
    res.status(200).send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

const createItem = (req, res) => {
  console.log(req.body)
  const { donorId, itemName, category, description, images, coordinates } = req.body;

  Item.create({
    donorId,
    category,
    name: itemName,
    description,
    imageUrl: images,
    longitude: coordinates.lng,
    latitude: coordinates.lat,
    status: 'unclaimed'
  })
  .then((result) => {
    res.status(201).json(result.dataValues)
  })
  .catch((err) => {
    res.status(401).json({ message: 'Item could not be created' })
  })

}

module.exports = {
  getItemsInRadius,
  createItem
};