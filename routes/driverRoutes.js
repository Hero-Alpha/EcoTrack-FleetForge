const express = require('express');
const Driver = require('../models/Driver');
const router = express.Router();

// Create a new driver
router.post('/', async (req, res) => {
  try {
    const { name, age, licenseNumber, contact, companyId } = req.body;
    const newDriver = new Driver({ name, age, licenseNumber, contact, company: companyId });
    await newDriver.save();
    res.status(201).json(newDriver);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all drivers
router.get('/', async (req, res) => {
  try {
    const drivers = await Driver.find().populate('company'); // Populate company info
    res.status(200).json(drivers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a driver by ID
router.get('/:id', async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id).populate('company');
    if (!driver) return res.status(404).json({ message: 'Driver not found' });
    res.status(200).json(driver);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update driver details
router.put('/:id', async (req, res) => {
  try {
    const updatedDriver = await Driver.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDriver) return res.status(404).json({ message: 'Driver not found' });
    res.status(200).json(updatedDriver);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a driver
router.delete('/:id', async (req, res) => {
  try {
    const deletedDriver = await Driver.findByIdAndDelete(req.params.id);
    if (!deletedDriver) return res.status(404).json({ message: 'Driver not found' });
    res.status(200).json({ message: 'Driver deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
