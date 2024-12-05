const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: String, required: false},
  licenseNumber: { type: String, required: true, unique: true },
  contact: { type: String },
  company: {type: mongoose.Schema.Types.ObjectId, ref:"Company"},
  createdAt: { type: Date, default: Date.now },
});

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;
