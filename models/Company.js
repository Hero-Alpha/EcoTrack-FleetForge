const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;