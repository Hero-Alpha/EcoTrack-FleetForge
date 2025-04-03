const Vehicle = require('../models/Vehicle');

// Create a new vehicle
exports.createVehicle = async (req, res) => {
  try {
    const { vehicleNumber, vehicleType, fuelType } = req.body;
    const newVehicle = new Vehicle({ vehicleNumber, vehicleType, fuelType });
    await newVehicle.save();
    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all vehicles
exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a vehicle by ID
exports.getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update vehicle details
exports.updateVehicle = async (req, res) => {
  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedVehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.status(200).json(updatedVehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a vehicle
exports.deleteVehicle = async (req, res) => {
  try {
    const deletedVehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!deletedVehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.status(200).json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
