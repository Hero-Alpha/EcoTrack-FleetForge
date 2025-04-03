const Company = require('../models/Company');
const ExpressError = require("../utils/ExpressError.js");

// Middleware for validation
const { companySchema } = require("../schema.js");

exports.validateCompany = (req, res, next) => {
  const { error } = companySchema.validate(req.body);
  if (error) {
    console.log(error);
    let errMsg = error.details.map(el => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// Create a new company
exports.createCompany = async (req, res) => {
  try {
    const { name, address, contact } = req.body;
    const newCompany = new Company({ name, address, contact });
    await newCompany.save();
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all companies
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a company by ID
exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.status(200).json(company);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update company details
exports.updateCompany = async (req, res) => {
  try {
    const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCompany) return res.status(404).json({ message: 'Company not found' });
    res.status(200).json(updatedCompany);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a company
exports.deleteCompany = async (req, res) => {
  try {
    const deletedCompany = await Company.findByIdAndDelete(req.params.id);
    if (!deletedCompany) return res.status(404).json({ message: 'Company not found' });
    res.status(200).json({ message: 'Company deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
