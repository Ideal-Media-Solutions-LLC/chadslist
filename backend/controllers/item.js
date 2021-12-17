const { Op } = require('sequelize');
const Item = require('../db/models/Item.js');

const getItemsInRadius = async (req, res) => {
  try {
    let userId = parseInt(req.query.userId) || 0;
    let radiusInMiles = parseInt(req.query.radius) || 25;
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
      },
      logging: false,
      raw: true
    });
    let sortedItems = sortItemsByNearest(items, searchLatitude, searchLongitude);
    res.status(200).send(sortedItems);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

const sortItemsByNearest = (arrItems, latUser, longUser) => {
  // declare a disObj
  let disObj = {};
  // for every item in the array of item objects
  for (let i = 0; i < arrItems.length; i++) {
    // let latItem to the current items latitude
    let latItem = parseFloat(arrItems[i].latitude);
    // let longItem to the current items longitude
    let longItem = parseFloat(arrItems[i].longitude);
    // take the x coordinate of the item and subtract the coord of the user, then square it
    // take the y coordinate of the item and subtract the coord of the user, then square it
    // add both together
    // take the square root of the result
    let d = 69 * Math.sqrt((latUser - latItem) ** 2 + (longUser - longItem) ** 2);
    disObj[d] = arrItems[i];
  }
  // return disObj's values
  return Object.entries(disObj).sort((a,b) => { return a[0] - b[0] } );
}

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
  createItem,
};
