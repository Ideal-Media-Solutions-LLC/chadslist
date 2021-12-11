const Item = require('../db/models/Item.js');

const getItems = async (req, res) => {
  // Get the that we want to select items from within (default 10)
  // Get the user somehow or the location that we are centering our search on

  // Make a query that gets all items that are within the specified radius, that aren't claimed and that aren't the current user's donations
};

module.exports = {
  getItems,
};