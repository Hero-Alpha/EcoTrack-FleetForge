const express = require('express');
const {
  calculateRailEmissions,
  calculateVehicleEmissions,
  calculateCommercialEmissions,
  calculateVesselEmissions,
} = require('../controllers/emissionController');

const router = express.Router();

router.post('/rail', calculateRailEmissions);
router.post('/vehicle', calculateVehicleEmissions);
router.post('/commercial', calculateCommercialEmissions);
router.post('/vessel', calculateVesselEmissions);

module.exports = router;
