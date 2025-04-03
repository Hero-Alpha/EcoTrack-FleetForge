const { postRequest } = require('../services/apiService');

const calculateRailEmissions = async (req, res) => {
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
};

const calculateVehicleEmissions = async (req, res) => {
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
};

const calculateCommercialEmissions = async (req, res) => {
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
};

const calculateVesselEmissions = async (req, res) => {
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
};

module.exports = {
  calculateRailEmissions,
  calculateVehicleEmissions,
  calculateCommercialEmissions,
  calculateVesselEmissions,
};
