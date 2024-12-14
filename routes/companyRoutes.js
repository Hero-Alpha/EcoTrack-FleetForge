const express = require('express');
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError.js")
const {companySchema} = require("../schema.js");
const Company = require('../models/Company');
const router = express.Router();


// ------------------------------------------------------------------------------------------------------
const validateListing = (req, res, next) => {
  const { error } = companySchema.validate(req.body);
  if (error) {
      // Log the exact error message
      console.log(error);
      let errMsg = error.details.map(el => el.message).join(",");
      throw new ExpressError(400, errMsg);
  } else {
      next();
  }
};

// ------------------------------------------------------------------------------------------------------
// Create a new company
router.post('/', async (req, res) => {
  try {
    const { name, address, contact } = req.body;
    const newCompany = new Company({ name, email, contact, address });
    await newCompany.save();
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all companies
router.get('/', async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a company by ID
router.get('/:id', async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.status(200).json(company);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update company details
router.put('/:id', async (req, res) => {
  try {
    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCompany) return res.status(404).json({ message: 'Company not found' });
    res.status(200).json(updatedCompany);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a company
router.delete('/:id', async (req, res) => {
  try {
    const deletedCompany = await Company.findByIdAndDelete(req.params.id);
    if (!deletedCompany) return res.status(404).json({ message: 'Company not found' });
    res.status(200).json({ message: 'Company deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
