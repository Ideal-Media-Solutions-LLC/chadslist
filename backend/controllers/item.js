const Item = require('../db/models/Item.js');

const getItemsInRadius = async (req, res) => {
  debugger;
  // Get the radius that we want to select items from within (default 10)
  let radiusInMiles = req.params.radius || 10;
  // We need to convert the radius from miles to degrees so we can compare it to the location of each item
  let radiusInDegrees = radiusInMiles / 69;
  // Get the user somehow or the location that we are centering our search on
  let searchLocation = req.params.location;
  // Make a query that gets all items that are within the specified radius, that aren't claimed and that aren't the current user's donations
};

module.exports = {
  getItemsInRadius,
};