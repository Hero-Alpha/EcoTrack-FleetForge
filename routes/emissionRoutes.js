const express = require('express');
const { postRequest } = require('../services/apiService');

const router = express.Router();

// Route for CARBON/01 (Rail Emissions)
router.post('/rail', async (req, res) => {
  const { distance, weight, tripCount } = req.body;

  try {
    const payload = {
      distance: String(distance),
      weight: String(weight),
      tripCount: String(tripCount),
    };
    const response = await postRequest('/CARBON/01', payload);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route for CARBON/02 (Vehicle Emissions)
router.post('/vehicle', async (req, res) => {
  const { distance, vehicleType, fuelType, noOfTrips } = req.body;

  try {
    const payload = {
      distance: String(distance),
      vehicleType: String(vehicleType),
      fuelType: String(fuelType),
      noOfTrips: String(noOfTrips),
    };
    const response = await postRequest('/CARBON/02', payload);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route for CARBON/03 (Commercial Emissions)
router.post('/commercial', async (req, res) => {
  const { distance, weight, noOfTrips } = req.body;

  try {
    const payload = {
      distance: String(distance),
      weight: String(weight),
      noOfTrips: String(noOfTrips),
    };
    const response = await postRequest('/CARBON/03', payload);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route for CARBON/04 (Vessel Emissions)
router.post('/vessel', async (req, res) => {
  const { distance, vesselType, vesselSize, noOfTrips } = req.body;

  try {
    const payload = {
      distance: String(distance),
      vesselType: String(vesselType),
      vesselSize: String(vesselSize),
      noOfTrips: String(noOfTrips),
    };
    const response = await postRequest('/CARBON/04', payload);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
