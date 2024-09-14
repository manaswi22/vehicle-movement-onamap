const express = require('express');
const router = express.Router();
const vehicleData = require('../data/locations.json');

let index = 0;

// Endpoint to serve vehicle location data
router.get('/', (req, res) => {
  const data = vehicleData[index];
  index = (index + 1) % vehicleData.length; // Loop through data
  res.json(data);
});

module.exports = router;
